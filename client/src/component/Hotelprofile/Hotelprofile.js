import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, Dimensions } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Caption, Divider, BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const OverviewScreen = () => (
    <View style={styles.screenContainer}>
        <Text>Overview Content</Text>
    </View>
);

const DetailsScreen = () => (
    <View style={styles.screenContainer}>
        <Text>Details Content</Text>
    </View>
);

const ReviewsScreen = () => (
    <View style={styles.screenContainer}>
        <Text>Reviews Content</Text>
    </View>
);

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
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'overview', title: 'Overview', icon: '' },
        { key: 'details', title: 'Details', icon: '' },
        { key: 'reviews', title: 'Reviews', icon: '' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        overview: OverviewScreen,
        details: DetailsScreen,
        reviews: ReviewsScreen,
    });

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
        Dimensions.addEventListener('change', onChange);
        return () => {
            Dimensions.removeEventListener('change', onChange);
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
                            ¤
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

                <BottomNavigation
                    style={styles.tabBar}
                    navigationState={{ index, routes }}
                    onIndexChange={setIndex}
                    renderScene={renderScene}
                    labelStyle={styles.tabBarLabel}
                    sceneAnimationEnabled={false}
                />
            </ScrollView>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fa',
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
        position: 'relative',
        marginHorizontal: '10%',
        borderRadius: 15,
        elevation: 4,
        backgroundColor: 'white',
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Hotelprofile;
