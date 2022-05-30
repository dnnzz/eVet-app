import { View,StyleSheet } from 'react-native'
import React from 'react'
import Carousel  , {ParallaxImage,Pagination} from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/themed';
export default function PetScreen() {
    const items = [
        {
            src:"https://wamu.org/wp-content/uploads/2017/05/unimpressed-cat-150x150.jpg"
        },
        {
            src:"https://wamu.org/wp-content/uploads/2017/05/unimpressed-cat-150x150.jpg"
        },
        {
            src:"https://wamu.org/wp-content/uploads/2017/05/unimpressed-cat-150x150.jpg"
        }
      ]
    const _renderItem = ({item, index},parallaxProps) => {
        return (
                <View style={styles.item}>
                    <ParallaxImage 
                     containerStyle={styles.imageContainer}
                     style={styles.image}
                source={{uri : item.src}}
                parallaxFactor={0.4}
                {...parallaxProps}
                />
                </View>
        );
    }
    const [index,setIndex] = React.useState(0);
  return (
    <SafeAreaView>
    <View style={{marginLeft:'20%'}}>
        <Carousel 
        layout='stack'
        data={items}
        renderItem={_renderItem}
        sliderWidth={200}
        itemWidth={200}
        itemHeight={200}
        onSnapToItem = { index => setIndex(index) }
        hasParallaxImages={true}
        />
          <Pagination
              dotsLength={items.length}
              activeDotIndex={index}
              containerStyle={{ backgroundColor: 'transparent',marginRight:"40%" }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'black'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
    </View>
    <View style={styles.flex}>
          <Text style={styles.text}>Tür : Kedi</Text>
          <Text style={styles.text}>Cins :Ankara kedisi</Text>
          <Text style={styles.text}>Cinsiyet :Dişi</Text>
          <Text style={styles.text}>Yaş :2</Text>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      width: 150,
      height: 150,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    flex: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        justifyContent:"space-between",
        marginLeft: 50
      },
    text:{
        fontSize:30
    }
  });