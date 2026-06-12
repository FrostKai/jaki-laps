export const projectsData = {
  sonara: {
    name: 'Sonara',
    status: 'ONLINE',
    type: 'Fullstack Marketplace',
    tagline: 'Gaming Asset Decentralized Exchange',
    description: 'A high-performance decentralized marketplace for gaming assets, built for sub-second trade confirmations and low-gas minting.',
    tech: ['React', 'Next.js', 'Node.js', 'Solidity', 'TailwindCSS', 'PostgreSQL', 'Ethers.js'],
    stats: {
      uptime: '99.98%',
      throughput: '1,420 txs/sec',
      avgLatency: '42ms',
      contracts: 'VERIFIED',
      activeNodes: 128
    },
    codeSnippet: `// sonara-contract-hook.js
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useSonaraMarket = (nftAddress) => {
  const [listing, setListing] = useState(null);
  
  useEffect(() => {
    const syncChainState = async () => {
      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
      const contract = new ethers.Contract(nftAddress, SonaraABI, provider);
      const details = await contract.getListingDetails();
      setListing({
        price: ethers.formatEther(details.price),
        seller: details.seller,
        active: details.isActive
      });
    };
    if (nftAddress) syncChainState();
  }, [nftAddress]);

  return { listing };
};`
  },
  'agv xora': {
    name: 'AGV Xora',
    status: 'ACTIVE',
    type: 'Robotics & Automation',
    tagline: 'Autonomous Industrial Navigation',
    description: 'Autonomous Guided Vehicle (AGV) controller software running pathfinding algorithms, LiDAR-based collision avoidance, and web telemetry.',
    tech: ['Python', 'C++', 'ROS2', 'OpenCV', 'WebSockets', 'Three.js', 'React'],
    stats: {
      speed: '1.2 m/sec',
      battery: '88%',
      activeSensors: 'LiDAR + IMU',
      cpuLoad: '42%',
      nodesOnline: 14
    },
    codeSnippet: `# xora_pathfinding.py
import numpy as np
import rospy
from geometry_msgs.msg import Twist

class PathPlanner:
    def __init__(self, start_pos, target_pos):
        self.grid = np.zeros((100, 100)) # Occupancy Grid Map
        self.start = start_pos
        self.target = target_pos
        self.cmd_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)

    def compute_heuristic(self, node):
        return np.linalg.norm(np.array(node) - np.array(self.target))

    def update_velocity(self, speed, angle):
        vel_msg = Twist()
        vel_msg.linear.x = speed
        vel_msg.angular.z = angle
        self.cmd_pub.publish(vel_msg)
        rospy.loginfo(f"Velocity updated: x={speed}, z={angle}")`
  },
  coolinghelm: {
    name: 'CoolingHelm',
    status: 'DEVELOPMENT',
    type: 'IoT Wearable',
    tagline: 'Smart Temperature Regulation Wearable',
    description: 'A smart industrial safety helmet with real-time temperature sensing, auto fan regulation, GPS telemetry, and Bluetooth BLE health dashboard.',
    tech: ['Flutter', 'Dart', 'C++', 'ESP32', 'BLE', 'Firebase', 'MQTT'],
    stats: {
      temperature: '24.5°C',
      fanSpeed: '3200 RPM',
      voltage: '3.7V',
      bleState: 'BROADCASTING',
      pulse: '72 bpm'
    },
    codeSnippet: `// cooling_helm_esp32.ino
#include <BLEDevice.h>
#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  BLEDevice::init("CoolingHelm_ESP32");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );
  pService->start();
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  if (temp > 28.0) {
    analogWrite(FAN_PIN, 255); // Maximum cool
  } else {
    analogWrite(FAN_PIN, 120); // Eco cooling
  }
  pCharacteristic->setValue(temp);
  pCharacteristic->notify();
  delay(1000);
}`
  },
  pesonajava: {
    name: 'PesonaJava',
    status: 'COMPLETED',
    type: 'Tourism Discovery Platform',
    tagline: 'Immersive Cultural Exploration Web App',
    description: 'An interactive travel Booking and Cultural discovery application showcasing Java tourism with rich, vector-animated maps and GSAP scenes.',
    tech: ['React', 'Vite', 'Firebase', 'Leaflet', 'GSAP', 'TailwindCSS', 'Framer Motion'],
    stats: {
      uptime: '100%',
      activeUsers: 852,
      databaseSync: 'SYNCHRONIZED',
      apiLatency: '22ms',
      pagesBuilt: 42
    },
    codeSnippet: `// MapAnimation.jsx
import { gsap } from 'gsap';

export const animatePinEntry = (markerRef, callback) => {
  gsap.fromTo(markerRef.current, 
    { 
      y: -150, 
      opacity: 0, 
      scale: 0.1 
    },
    { 
      y: 0, 
      opacity: 1, 
      scale: 1, 
      duration: 1.2, 
      ease: "bounce.out",
      onComplete: callback
    }
  );
};`
  }
}
