import {
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { coordsData } from "../data/LocalData";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

type LocationInfosType = {
  id: number;
  lat: number;
  long: number;
  name: string;
  pic: string;
  description: string;
};

const getCurrentLocation = async () => {
  const { granted } = await Location.requestForegroundPermissionsAsync();
  if (!granted) {
    ToastAndroid.show(
      "To get access to your current location we need your location permession please go to settings and give us the permission",
      ToastAndroid.LONG
    );
    return null;
  }
  const { coords } = await Location.getCurrentPositionAsync();
  return {
    longitude: coords.longitude,
    latitude: coords.latitude,
  };
};

const MapComponent = () => {
  const { height, width } = Dimensions.get("screen");

  const [locationInfos, setLocationInfos] = useState<LocationInfosType>();
  const [currentLocationCoords, setCurrentLocationCoords] = useState<{
    longitude: number;
    latitude: number;
  }>();
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);
  const mapRef = useRef<MapView>(null);

  const defaultLatitude = 34.03313;
  const defaultLongitude = -5.00028;
  const initialLatitudeDelta = 0.01;
  const initialLongitudeDelta = initialLatitudeDelta * 2;

  const customBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => {
      return (
        <BottomSheetBackdrop
          {...props}
          pressBehavior={"close"}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      );
    },
    []
  );
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ width, height: 500 }}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{ width: "100%", height: "100%" }}
          minDelta={100}
          initialRegion={{
            latitude: defaultLatitude,
            longitude: defaultLongitude,
            latitudeDelta: initialLatitudeDelta,
            longitudeDelta: initialLongitudeDelta,
          }}
          zoomControlEnabled
        >
          {coordsData.map((coords) => (
            <Marker
              key={coords.id}
              coordinate={{
                latitude: coords.lat,
                longitude: coords.long,
              }}
              onPress={() => {
                setLocationInfos(coords);
                setTimeout(() => {
                  bottomSheetRef.current?.present();
                }, 500);
              }}
              onCalloutPress={() => {}}
              // onCalloutBlur={handleMarkerBlur}
              // onFocus={() => handleMarkerHover("marker1")}
              // onBlur={handleMarkerBlur}
              style={{ width: 50, height: 50, borderRadius: 200 }}
            >
              <Image
                source={{
                  uri: coords.pic,
                }}
                width={50}
                height={50}
                style={{ borderRadius: 100, backgroundColor: "black" }}
                resizeMode="contain"
              />
            </Marker>
          ))}
          {currentLocationCoords && (
            <Marker
              coordinate={{
                latitude: currentLocationCoords.latitude,
                longitude: currentLocationCoords.longitude,
              }}
              // onCalloutBlur={handleMarkerBlur}
              // onFocus={() => handleMarkerHover("marker1")}
              // onBlur={handleMarkerBlur}
              style={{ width: 50, height: 50, borderRadius: 200 }}
            >
              <Entypo name="location-pin" size={54} color="red" />
            </Marker>
          )}
        </MapView>
        <View
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            paddingHorizontal: 10,
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              const res = await getCurrentLocation();
              if (res === null) return;
              setCurrentLocationCoords({
                latitude: res.latitude,
                longitude: res.longitude,
              });
              mapRef.current?.animateToRegion({
                latitude: res.latitude,
                longitude: res.longitude,
                latitudeDelta: 0.002, // Set the desired zoom level
                longitudeDelta: 0.002,
              });
            }}
          >
            <MaterialIcons name="gps-fixed" size={34} color="black" />
          </TouchableOpacity>
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["70%"]}
          backdropComponent={customBackdrop}
        >
          <View
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              source={{ uri: locationInfos?.pic }}
              width={width}
              height={180}
            />
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 50 }}>{locationInfos?.name}</Text>
              <Text>{locationInfos?.description}</Text>
            </View>
          </View>
        </BottomSheetModal>
      </View>
    </View>
  );
};

export default MapComponent;
