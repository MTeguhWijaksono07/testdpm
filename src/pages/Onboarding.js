import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    id: "1",
    title: "Manage your finances now Here",
    image: require("../assets/Images/Onboarding01.png"),
  },
  {
    id: "2",
    title: "Easy To Apply on Mobile App",
    image: require("../assets/Images/Onboarding02.png"),
  },
];

const Onboarding = ({ setIsOnboarded }) => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  const goToNextSlide = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setIsOnboarded(true);
      navigation.navigate("LoginScreen");
    }
  };

  const skipOnboarding = () => {
    setIsOnboarded(true);
    navigation.navigate("LoginScreen");
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={[styles.title]}>{item.title}</Text>
      </View>

      {index === currentIndex && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={goToNextSlide}>
            <Text style={styles.nextButtonText}>{currentIndex < onboardingData.length - 1 ? "→" : "Done"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slide: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 45,
    marginTop: 0,
  },
  image: {
    width: width,
    height: height * 0.6,
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "90%",
    paddingHorizontal: 13,
    marginBottom: 150,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 80,
    width: "90%",
    alignSelf: "center",
  },
  skipButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  indicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  indicator: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: "#000",
  },
});

export default Onboarding;
