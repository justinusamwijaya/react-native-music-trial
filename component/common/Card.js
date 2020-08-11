import React, {Component} from 'react';
import {PanResponder, Animated, StyleSheet, View, Text} from 'react-native';
import { Audio } from 'expo-av';
import { connect } from 'react-redux'
import { changeCurrentIndex } from '../../actions'

const mapStateToProps = state => {
    return {
        currentIndex: state.animation.currentIndex,
        indexes: state.animation.indexes
    }
}

const soundObject = new Audio.Sound()

export default connect(mapStateToProps, { changeCurrentIndex })(class Card extends Component {

    state = {  
        cardsPan: new Animated.ValueXY(),  
        cardsStackedAnim: new Animated.Value( 0 ), // add this statement
        outputRangeTop: [(this.props.order - 1) * 20, this.props.order * 20]
     }

    cardsPanResponder = PanResponder.create( {
        onStartShouldSetPanResponder: () => true,
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: ( event, gestureState ) => {
          this.state
            .cardsPan
            .setValue(
              { x: gestureState.dx, y: this.state.cardsPan.y }
             );
        },
        onPanResponderTerminationRequest: () => false,
        onPanResponderRelease: ( event, gestureState ) => {
             // bring the translationX back to 0
            Animated.timing( this.state.cardsPan, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            } ).start();
            // will be used to interpolate values in each view
            Animated.timing( this.state.cardsStackedAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false
            } ).start( () => {
                // reset cardsStackedAnim's value to 0 when animation ends
                this.state.cardsStackedAnim.setValue( 0 );
                // increment card position when animation ends
                this.stopSong()
                this.props.indexes.push(this.props.order)
                this.props.indexes.splice(0, 1)

                let newIndex = this.props.currentIndex + 1 >= this.props.totalCards + 1 ? 1 : this.props.currentIndex + 1

                this.props.changeCurrentIndex({
                    currentIndex: newIndex,
                    indexes: this.props.indexes
                    })
            } );
        },
      } )

        async componentDidMount() {
            try {
                await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
                })

                if(!this.props.indexes.indexOf(this.props.order)) this.playSong()
            } catch (e) {
                console.log(e)
            }
        }
        
        componentDidUpdate() {
            if(!this.props.indexes.indexOf(this.props.order)) this.playSong()
        }

    async playSong() {
        try {
            await soundObject.loadAsync(this.props.song);
            await soundObject.playAsync();
        } catch (err) {

        }

    }

    async stopSong() {
        await soundObject.unloadAsync();
    }

    render() {
        return (
            <Animated.View { ...this.cardsPanResponder.panHandlers } style={{...styles.contentContainer, 
            zIndex: !this.props.indexes.indexOf(this.props.order) ? this.state.cardsStackedAnim.interpolate({
                    inputRange: [ 0, 0.5, 1 ], outputRange: [ 3, 2, 0 ] }) : 3 - this.props.indexes.indexOf(this.props.order), 
            top: this.state.cardsStackedAnim.interpolate({
                    inputRange: [ 0, 1 ], outputRange: [(this.props.indexes.indexOf(this.props.order)) * 20, (this.props.indexes.indexOf(this.props.order) + 1) * 20] }), 
            opacity: !this.props.indexes.indexOf(this.props.order) ? 
                    this.state.cardsStackedAnim.interpolate({
                            inputRange: [ 0, 1 ], outputRange: [1, 0.3] }) 
                    : 
                    this.state.cardsStackedAnim.interpolate({
                            inputRange: [ 0, 1 ], outputRange: [this.props.indexes.indexOf(this.props.order) == 1 ? 0.6 : 0.3, this.props.indexes.indexOf(this.props.order) == 1 ? 1 : 0.6] }), 
            transform: !this.props.indexes.indexOf(this.props.order) ? [ { 
                translateX: this.state.cardsPan.x
            }, {
                scale: this.state.cardsStackedAnim.interpolate({
                    inputRange: [ 0, 1 ], outputRange: [ 1, 0.8 ] 
                    }) 
            } ] 
            : 
            [ {
                scale: this.state.cardsStackedAnim.interpolate({
                    inputRange: [ 0, 1 ], outputRange: [ this.props.indexes.indexOf(this.props.order) == 1 ? 0.9 : 0.8, this.props.indexes.indexOf(this.props.order) == 1 ? 1 : 0.9] 
                    }) 
            }]
            }}>
                {this.props.children}
            </Animated.View>
        )
    }
})

const styles = StyleSheet.create({
    contentContainer: {
        width: 300,
        height: 200,
        // borderWidth: 1,
        borderRadius: 10,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 4,
        overflow: 'hidden',
        position: 'absolute'
    },
})