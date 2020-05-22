import React, { Component } from 'react'
import { ScrollView, Image, Dimensions, Text } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('screen').width

export default class UsuarioScreen extends Component {
    static navigationOptions = {
        title: 'Usuário'
    }

    /*<Image 
                    source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
                    style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
                />
                <Text style={{padding:10}}>{hero.description}</Text>
                */

    render() {
        //const { usuario } = this.props.navigation.state.params
        return (
           <ScrollView>
               
                <Text style={{padding:10, fontSize:20}}>fddfdf</Text>
                
           </ScrollView> 
        )
    }
}