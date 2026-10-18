import { View, Text } from 'react-native'
import React from 'react'

const TabScreenBackground = () => {
  return (
    <>
    <View
    pointerEvents='none'
    className='absolute -left-[120px] -top-8 h-64 w-64 rounded-full bg-accent'
    />
     <View
    pointerEvents='none'
    className='absolute -right-[120px] -top-32 h-72 w-72 rounded-full bg-secondary'
    />
     {/* <View
    pointerEvents='none'
    className='absolute -right-[120px] -bottom-32 h-72 w-72 rounded-full bg-secondary'
    /> */}
    
    </>
  )
}

export default TabScreenBackground