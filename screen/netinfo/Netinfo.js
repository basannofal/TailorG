import React from 'react'
import NetInfo from '@react-native-community/netinfo';


const Netinfo = () => {
    return NetInfo.fetch().then(state => {
        return state.isConnected;
    });
}

export default Netinfo