import { StyleSheet, Text,Modal,Pressable, View, ScrollView, ActivityIndicator, Image, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import  Icon from 'react-native-vector-icons/FontAwesome';
import { Title, Caption, Divider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import {reviewAsync} from "../../reduce/review"
import {useDispatch, useSelector} from "react-redux"
import { decode } from "base-64";
global.atob = decode;
import {jwtDecode} from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchReviewAsync} from "../../reduce/fetchReview"



const OverviewScreen = () => (
  <ScrollView style={styles.overviewContainer}>
      <Text style={styles.overviewTitle}>About Grand Hotel</Text>
      <Text style={styles.overviewText}>
          Welcome to the Grand Hotel, a luxurious retreat located in the heart of the city. With elegant suites, exceptional dining, and stunning views, we offer an unforgettable experience for both leisure and business travelers.
      </Text>
      <Divider style={styles.overviewDivider} />
      
      <Text style={styles.overviewTitle}>Key Amenities</Text>
      <View style={styles.amenitiesContainer}>
          <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="wifi" size={30} color="#007BFF" />
              <Text style={styles.amenityLabel}>Free WiFi</Text>
          </View>
          <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="pool" size={30} color="#007BFF" />
              <Text style={styles.amenityLabel}>Swimming Pool</Text>
          </View>
          <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="bed-king-outline" size={30} color="#007BFF" />
              <Text style={styles.amenityLabel}>Luxury Suites</Text>
          </View>
          <View style={styles.amenityItem}>
              <MaterialCommunityIcons name="car" size={30} color="#007BFF" />
              <Text style={styles.amenityLabel}>Free Parking</Text>
          </View>
      </View>
      <Divider style={styles.overviewDivider} />

      <Text style={styles.overviewTitle}>Gallery</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
              source={{ uri: 'https://images.lifestyleasia.com/wp-content/uploads/sites/2/2021/03/08103440/best-suites-hk-grand-hyatt-3-1024x767.png' }}
              style={styles.galleryImage}
          />
          <Image
              source={{ uri: 'https://thumbs.dreamstime.com/b/luxury-hotel-4480742.jpg' }}
              style={styles.galleryImage}
          />
          <Image
              source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/146/867/628/luxury-hotel-wallpaper-preview.jpg' }}
              style={styles.galleryImage}
          />
      </ScrollView>
  </ScrollView>
);

const DetailsScreen = () => (
  <ScrollView style={styles.detailsContainer}>
      <Text style={styles.detailsTitle}>Hotel Details</Text>
      
      <Text style={styles.detailsHeading}>Check-In/Check-Out</Text>
      <Text style={styles.detailsText}>Check-In: 7:00 AM</Text>
      <Text style={styles.detailsText}>Check-Out: 12:00 PM</Text>
      <Divider style={styles.detailsDivider} />

      <Text style={styles.detailsHeading}>Address</Text>
      <Text style={styles.detailsText}>123 Main Street, City, Country</Text>
      <Divider style={styles.detailsDivider} />

      <Text style={styles.detailsHeading}>Contact Information</Text>
      <Text style={styles.detailsText}>Phone: +123 456 7890</Text>
      <Text style={styles.detailsText}>Email: info@grandhotel.com</Text>
      <Divider style={styles.detailsDivider} />

      <Text style={styles.detailsHeading}>Policies</Text>
      <Text style={styles.detailsText}>- No smoking inside the rooms.</Text>
      <Text style={styles.detailsText}>- Pets allowed with prior notice.</Text>
      <Text style={styles.detailsText}>- Free cancellation up to 24 hours before arrival.</Text>
      <Divider style={styles.detailsDivider} />

      <Text style={styles.detailsHeading}>Room Information</Text>
      <Text style={styles.detailsText}>- Standard Room: 1 King Bed, City View</Text>
      <Text style={styles.detailsText}>- Deluxe Room: 2 Queen Beds, Ocean View</Text>
      <Text style={styles.detailsText}>- Suite: 1 King Bed, Balcony, Ocean View</Text>
      <Divider style={styles.detailsDivider} />

      <Text style={styles.detailsHeading}>Dining Options</Text>
      <Text style={styles.detailsText}>- The Grand Restaurant: Fine Dining</Text>
      <Text style={styles.detailsText}>- Ocean Breeze Café: Casual Breakfast & Lunch</Text>
      <Text style={styles.detailsText}>- Poolside Bar: Cocktails & Snacks</Text>
      <Divider style={styles.detailsDivider} />
  </ScrollView>
);
const ReviewsScreen = () => {
    const [review, setReview] = useState({
        rating: 1,
        content: '',
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [maxRating] = useState([1, 2, 3, 4, 5]);
    // console.log("rating",review.rating);
    // console.log("comment",review.comment);
    const dispatch=useDispatch()
    useEffect( () => {
        
      dispatch(fetchReviewAsync({ id: 1 }));
    
        
      
      
    }, []);
       const reviews=useSelector(state=>state.fetchReview.reviews)
    const postReview = async (hotelId) => {
        try {
            const userId = await tokenGeted();
            dispatch(reviewAsync({ userId, hotelId:1, obj: review }));
        } catch (error) {
            console.log(error);
        }
    };
    
    const tokenGeted = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const decoded = jwtDecode(token);
            console.log("userId",decoded.id);
            return decoded.id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    // console.log("userId",tokenGeted());


    const handleInputChange = (name, value) => {
        
        setReview({...review,[name]: value });
        } 

        
        

    return (<ScrollView  >
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
            
        <View style={{alignItems:"center"}}>
        <View style={styles.review}>
        <Icon onPress={() => setModalVisible(!modalVisible)} name='remove' color="red" size={30} style={{marginLeft:315}}/>
            
            <View style={{alignItems:"center"}}>
            <Text style={{color:"#112678",fontSize:20,fontWeight:"bold",marginLeft:-190}}>Comment</Text>
            <TextInput
            textAlignVertical="top"
            multiline={true}
            onChangeText={(text)=>handleInputChange("content",text)}
            style={{borderWidth:2,borderRadius:20,fontSize:20,width:300,height:55,borderColor:"#112678",backgroundColor:"white"}}/>
            </View>
        <View style={{justifyContent:"center",flexDirection:"row"}}>
            {maxRating.map((e, i) => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    onPress={() => setReview({
                        ...review,
                        rating:e
                    })}
                >
                    <Image
                    style={{width:40,height:40,resizeMode:"cover",marginBottom:-15,marginTop:5,borderWidth:2}}
                        source={
                            e <= review.rating
                                ? require("../../Photo/star_filled.png")
                                : require("../../Photo/star_corner.png")
                        }
                    />
                </TouchableOpacity>
            ))}
        </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={postReview}>
              <Text style={styles.next}>add</Text>
            </TouchableOpacity>
        </View>
        </View>
        </Modal>
        <ScrollView>

        {reviews.map((e,i)=>{
            return<View key={i}>
                <Text>{e.user.firstName} {e.user.lastName}</Text>
                <Text>{e.content}</Text>
            </View>
        })}
        </ScrollView>
        <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color:"white"}}>Add reviews</Text>
            </TouchableOpacity>
    </ScrollView>
    );
};

    
    




const Hotelprofile = () => {
    const carouselImages = [
        { url: 'https://media.cnn.com/api/v1/images/stellar/prod/140127103345-peninsula-shanghai-deluxe-mock-up.jpg' },
        { url: 'https://www.bulgarihotels.com/.imaging/bhr-wide-small-jpg/dam/pre-home/collection_2.png/jcr%3Acontent' },
        { url: 'https://images.lifestyleasia.com/wp-content/uploads/sites/2/2021/03/08103440/best-suites-hk-grand-hyatt-3-1024x767.png' },
        { url: 'https://thumbs.dreamstime.com/b/luxury-hotel-4480742.jpg' },
        { url: 'https://c4.wallpaperflare.com/wallpaper/146/867/628/luxury-hotel-wallpaper-preview.jpg' },
    ];

    const hotelLocation = "123 Main Street, City";
    const hotelName = "Grand Hotel";
    const hotelRating = 4.5;

    const scrollRef = useRef();
    const [dimension, setDimension] = useState(Dimensions.get('window'));
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTab, setSelectedTab] = useState('overview');

    const setIndexCarousel = event => {
        let viewSize = event.nativeEvent.layoutMeasurement.width;
        let contentOffset = event.nativeEvent.contentOffset.x;
        let carouselIndex = Math.floor(contentOffset / viewSize);
        setSelectedIndex(carouselIndex);
    };

    useEffect(() => {
        const onChange = ({ window }) => {
            setDimension(window);
        };
        const x=Dimensions.addEventListener('change', onChange);
        return () => {
            x.remove()
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedIndex(prevSelectedIndex =>
                prevSelectedIndex === carouselImages.length - 1 ? 0 : prevSelectedIndex + 1
            );
            scrollRef.current.scrollTo({
                animated: true,
                y: 0,
                x: dimension.width * selectedIndex,
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [dimension.width, selectedIndex]);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const iconName = i <= rating ? "star" : i - rating < 1 ? "star-half-full" : "star-outline";
            stars.push(
                <MaterialCommunityIcons
                    key={i}
                    name={iconName}
                    size={20}
                    color="#FFD700"
                    style={styles.starIcon}
                />
            );
        }
        return stars;
    };

    const renderSelectedTab = () => {
        switch (selectedTab) {
            case 'overview':
                return <OverviewScreen />;
            case 'details':
                return <DetailsScreen />;
            case 'reviews':
                return <ReviewsScreen />;
            default:
                return <OverviewScreen />;
        }
    };

    return (
        <SafeAreaProvider>
            <ScrollView style={styles.container}>
                <ScrollView
                    horizontal
                    ref={scrollRef}
                    onMomentumScrollEnd={setIndexCarousel}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                >
                    {carouselImages.map((value, key) => (
                        <Image
                            key={key}
                            source={{ uri: `${value.url}` }}
                            style={{ width: dimension?.width, height: 250, resizeMode: 'cover' }}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    ))}
                </ScrollView>
                <View style={styles.dotContainer}>
                    {carouselImages.map((val, key) => (
                        <Text
                            key={key}
                            style={key === selectedIndex ? styles.activeDot : styles.inactiveDot}
                        >  
                        </Text>
                    ))}
                </View>
                <Divider style={styles.divider} />
                <View style={styles.infoLine}>
                    <MaterialCommunityIcons name="bed-outline" size={24} color="#333" />
                    <Title style={styles.titleText}>{hotelName}</Title>
                    <View style={styles.ratingContainer}>
                        {renderStars(hotelRating)}
                    </View>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.infoLine}>
                    <MaterialCommunityIcons name="map-marker-outline" size={24} color="#333" />
                    <Caption style={styles.captionText}>{hotelLocation}</Caption>
                </View>
                <Divider style={styles.divider} />
                {/* Custom Navigation Bar */}
                <View style={styles.tabBar}>
                    {['overview', 'details', 'reviews'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={styles.tabItem}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text
                                style={[
                                    styles.tabLabel,
                                    selectedTab === tab && styles.selectedTabLabel
                                ]}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </Text>
                            {selectedTab === tab && <View style={styles.tabIndicator} />}
                        </TouchableOpacity>
                    ))}
                </View>
                <Divider style={styles.divider} />
                {renderSelectedTab()}
            </ScrollView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fa',
    },
    buttonContainer: {
        marginTop: 20,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 80,
        borderRadius: 30,
        borderStyle: "solid",
        backgroundColor: '#112678',
        textAlign:"center"
      },
      next: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
      },
    review:{
        backgroundColor:"#E0FFFF",
        alignItems:"center",
        width:350,
        height:230,
        borderRadius:20
    },
    dotContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    activeDot: {
        color: 'white',
    },
    inactiveDot: {
        color: '#888',
    },
    infoLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    titleText: {
        fontSize: 20,
        color: '#333',
    },
    captionText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#666',
    },
    divider: {
        marginHorizontal: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        marginRight: 3,
    },
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    tabItem: {
        alignItems: 'center',
        flex: 1,
    },
    tabLabel: {
        fontSize: 16,
        color: '#666',
    },
    selectedTabLabel: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    tabIndicator: {
        width: '100%',
        height: 3,
        backgroundColor: '#007BFF',
        marginTop: 2,
    },
    overviewContainer: {
      flex: 1,
      padding: 16,
  },
  overviewTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333',
  },
  overviewText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 16,
      lineHeight: 20,
  },
  overviewDivider: {
      marginVertical: 16,
  },
  amenitiesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
  },
  amenityItem: {
      alignItems: 'center',
  },
  amenityLabel: {
      fontSize: 12,
      color: '#555',
      marginTop: 4,
  },
  galleryImage: {
      width: 250,
      height: 150,
      borderRadius: 8,
      marginRight: 10,
      resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
},
detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
},
detailsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#555',
},
detailsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
},
detailsDivider: {
    marginVertical: 16,
},
});

export default Hotelprofile;
