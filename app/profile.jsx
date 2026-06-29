import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native'
import BottomNav from '../components/BottomNav'
import profile from '../assets/img/profile.avif'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Profile = () => {
    
    const settingsSections = [
        {
            title: "Account",
            data: [
                { id: 1, icon: <AntDesign name="user" size={24} color="black" />, label: "Personal Information", navigation: "PersonalInformation" },
                { id: 2, icon: <AntDesign name="file-text" size={24} color="black" />, label: "Documents", navigation: "Documents" },
                { id: 3, icon: <FontAwesome6 name="contact-book" size={24} color="black" />, label: "Contact details", navigation: "ContractDetails" },
                { id: 4, icon: <FontAwesome5 name="key" size={24} color="black" />, label: "Change Password", navigation: "ChangePassword" },
            ],
        },
        {
            title: "Support",
            data: [
                { id: 1, icon: <FontAwesome5 name="headset" size={24} color="black" />, label: "Contact Us", navigation: "ContactUs" },
                { id: 2, icon: <AntDesign name="question-circle" size={24} color="black" />, label: "Help", navigation: "HelpCenter" },
            ]
        },
        {
            title: "Legal",
            data: [
                { id: 1, icon: <Ionicons name="document-text-outline" size={24} color="black" />, label: "Terms and Conditions", navigation: "TermsAndConditions" },
                { id: 2, icon: <Ionicons name="shield-checkmark-outline" size={24} color="black" />, label: "Privacy Policy", navigation: "PrivacyPolicy" },
            ]
        }
    ]


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.divider}></View>
        </View>

        <View style={styles.profileContainer}>
            <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Doe Jane</Text>
                <Text style={styles.profileEmail}>doejane@gmail.com</Text>
            </View>
            <View style={styles.profileImage}>
                <Image source={profile} style={styles.profileImage} />
            </View>
        </View>

        {settingsSections.map((section) => (
            <View key={section.title}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                {section.data.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.settingItemContainer} onPress={() => console.log(`Navigate to ${item.navigation}`)}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            {item.icon}
                            <Text style={styles.settingItem}>{item.label}</Text>
                        </View>
                        <FontAwesome name="angle-right" size={24} color="black" />
                    </TouchableOpacity>
                ))}
            </View>
        ))}

      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FA' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 110, paddingTop: 8 },
  header: {
     paddingHorizontal: 20,
      paddingTop: 12, 
      paddingBottom: 8 ,
      marginTop: 30,
      margin: "auto",
    },
    headerTitle: {
        fontSize: 26, 
        fontWeight: '700', 
        color: "#16263A" 
    },
    divider: { 
        marginVertical: 10,
        width: "100%",
        backgroundColor: "red", 
        height: 4 
    },
    profileContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profileInfo: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: "#16263A"
    },
    profileEmail: {
        fontSize: 16,
        color: "#6C757D"
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: '500',
        color: "#16263A",
        marginTop: 20,
        marginBottom: 10
    },
    settingItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#FFFFFF",
        marginBottom: 10,
        borderRadius: 8,
    },
    settingItem: {
        fontSize: 16,
        color: "#16263A"
    }
})

export default Profile