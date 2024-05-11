import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = (result) => {
    const {data} = result;
    // setScanned(true);
    if (result="https://www.youtube.com/")
      console.log("success");
    // alert(data);
  };
  
  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        style={StyleSheet.absoluteFillObject}
        flashMode={flashOn ? "torch" : "off"}
      />
      <View style={styles.bottomBox}>
        <TouchableOpacity style={styles.flashlightButton}  onPress={toggleFlash}>
          <MaterialCommunityIcons name={flashOn ? "flashlight" : "flashlight-off"} size={24} color="black" />
        </TouchableOpacity>
        {/* <View style={styles.buttom}>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashlightButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#afeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttom: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    alignItems: 'center',
  },
});