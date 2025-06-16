import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const categoriesData = [
  { id: '1', name: 'مأكولات بحرية', icon: 'fish' },
  { id: '2', name: 'ساندويشات', icon: 'fast-food' },
  { id: '3', name: 'أطباق رئيسية', icon: 'restaurant' },
  { id: '4', name: 'شوربات', icon: 'nutrition' },
  { id: '5', name: 'مقبلات', icon: 'ice-cream' },
  { id: '6', name: 'مشروبات', icon: 'beer' },
];

// بيانات أصناف الطعام مع القسم والسعر والوصف
const foodsData = [
  // مأكولات بحرية
  {
    id: 'f1',
    name: 'سمك مشوي',
    categoryId: '1',
    description: 'سمك طازج مشوي على الفحم مع توابل خاصة',
    price: 50,
    nutrition: 'بروتين عالي، قليل الدهون',
  },
  {
    id: 'f2',
    name: 'روبيان مقلي',
    categoryId: '1',
    description: 'روبيان مقلي مع صلصة حارة',
    price: 45,
    nutrition: 'بروتين عالي، غني بأوميغا 3',
  },
  {
    id: 'f3',
    name: 'حبار مقلي',
    categoryId: '1',
    description: 'حبار مقلي مقرمش مع صلصة الثوم',
    price: 40,
    nutrition: 'بروتين عالي، قليل الدهون',
  },

  // ساندويشات
  {
    id: 'f4',
    name: 'ساندويش شاورما',
    categoryId: '2',
    description: 'شاورما دجاج مع خضار وصلصة طحينة',
    price: 25,
    nutrition: 'بروتين متوسط، غني بالكربوهيدرات',
  },
  {
    id: 'f5',
    name: 'ساندويش برجر',
    categoryId: '2',
    description: 'برجر لحم مع جبن وخس وطماطم',
    price: 30,
    nutrition: 'بروتين عالي، غني بالدهون',
  },
  {
    id: 'f6',
    name: 'ساندويش جبنة مشوية',
    categoryId: '2',
    description: 'جبنة موزاريلا مشوية مع طماطم وخبز خاص',
    price: 22,
    nutrition: 'كالسيوم عالي، غني بالدهون',
  },

  // أطباق رئيسية
  {
    id: 'f7',
    name: 'كبسة دجاج',
    categoryId: '3',
    description: 'كبسة أرز مع دجاج متبل بتوابل عربية',
    price: 55,
    nutrition: 'بروتين عالي، غني بالكربوهيدرات',
  },
  {
    id: 'f8',
    name: 'مقلوبة',
    categoryId: '3',
    description: 'مقلوبة باذنجان وخضار مع دجاج',
    price: 50,
    nutrition: 'متوازن بين البروتين والخضار',
  },
  {
    id: 'f9',
    name: 'منسف',
    categoryId: '3',
    description: 'منسف لحم مع رز ولبن جميد',
    price: 60,
    nutrition: 'بروتين عالي، غني بالكالسيوم',
  },

  // شوربات
  {
    id: 'f10',
    name: 'شوربة عدس',
    categoryId: '4',
    description: 'شوربة عدس صحية مع توابل شرقية',
    price: 18,
    nutrition: 'غنية بالألياف، منخفضة الدهون',
  },
  {
    id: 'f11',
    name: 'شوربة دجاج',
    categoryId: '4',
    description: 'شوربة دجاج مع خضار طازجة',
    price: 20,
    nutrition: 'بروتين متوسط، خفيف على المعدة',
  },

  // مقبلات
  {
    id: 'f12',
    name: 'حمص',
    categoryId: '5',
    description: 'حمص بطحينة مع زيت زيتون وليمون',
    price: 15,
    nutrition: 'مصدر جيد للبروتين النباتي',
  },
  {
    id: 'f13',
    name: 'تبولة',
    categoryId: '5',
    description: 'سلطة تبولة منعشة مع برغل وطماطم',
    price: 12,
    nutrition: 'غنية بالألياف والفيتامينات',
  },

  // مشروبات
  {
    id: 'f14',
    name: 'عصير برتقال',
    categoryId: '6',
    description: 'عصير برتقال طبيعي طازج',
    price: 10,
    nutrition: 'فيتامين C عالي',
  },
  {
    id: 'f15',
    name: 'قهوة عربية',
    categoryId: '6',
    description: 'قهوة عربية مع هيل',
    price: 8,
    nutrition: 'منبه طبيعي',
  },
  {
    id: 'f16',
    name: 'شاي نعناع',
    categoryId: '6',
    description: 'شاي أخضر بالنعناع',
    price: 7,
    nutrition: 'مفيد للهضم',
  },
];

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    if (username.trim() && password.trim()) {
      navigation.replace('Home');
    } else {
      Alert.alert('خطأ', 'يرجى إدخال اسم المستخدم وكلمة المرور');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>تسجيل الدخول</Text>
      <TextInput
        placeholder="اسم المستخدم"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="كلمة المرور"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>دخول</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>ليس لديك حساب؟ سجل الآن</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onSignup = () => {
    if (!username.trim() || !password.trim() || !confirm.trim()) {
      Alert.alert('خطأ', 'يرجى تعبئة جميع الحقول');
      return;
    }
    if (password !== confirm) {
      Alert.alert('خطأ', 'كلمة المرور غير متطابقة');
      return;
    }
    Alert.alert('تم التسجيل', 'تم إنشاء الحساب بنجاح');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>تسجيل الاشتراك</Text>
      <TextInput
        placeholder="اسم المستخدم"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="كلمة المرور"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="تأكيد كلمة المرور"
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onSignup}>
        <Text style={styles.buttonText}>تسجيل</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>لديك حساب؟ تسجيل الدخول</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>الأقسام</Text>
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Category', { categoryId: item.id, categoryName: item.name })}
          >
            <Ionicons name={item.icon} size={48} color="#ff6347" />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

function CategoryScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;
  const foods = foodsData.filter((f) => f.categoryId === categoryId);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{categoryName}</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.foodCard}
            onPress={() => navigation.navigate('Details', { food: item })}
          >
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>{item.price} شيكل</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

function DetailsScreen({ route, navigation }) {
  const { food } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{food.name}</Text>
      <ScrollView style={{ marginVertical: 10 }}>
        <Text style={styles.desc}><Text style={{ fontWeight: 'bold' }}>الوصف:</Text> {food.description}</Text>
        <Text style={styles.desc}><Text style={{ fontWeight: 'bold' }}>المكونات الغذائية:</Text> {food.nutrition}</Text>
        <Text style={[styles.desc, { marginTop: 10, fontWeight: 'bold' }]}>التعليقات والتقييم:</Text>
        {/* هنا يمكن إضافة تعليقات وتقييمات في النسخة القادمة */}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={() => {
          navigation.navigate('Cart', { addFood: food });
        }}
      >
        <Text style={styles.buttonText}>أضف إلى السلة</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

function CartScreen({ route, navigation }) {
  // حالة السلة موجودة هنا لاستخدامها في التطبيق كامل
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    if (route.params?.addFood) {
      const foodToAdd = route.params.addFood;
      // التحقق إذا كان العنصر موجودًا في السلة
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((item) => item.id === foodToAdd.id);
        if (existingIndex !== -1) {
          // زيادة الكمية إذا موجود
          const updatedCart = [...prevCart];
          updatedCart[existingIndex].quantity += 1;
          return updatedCart;
        } else {
          return [...prevCart, { ...foodToAdd, quantity: 1 }];
        }
      });
    }
  }, [route.params?.addFood]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddMore = () => {
    Alert.alert(
      'الإضافة',
      'هل ترغب بالعودة للأقسام لإضافة المزيد؟',
      [
        { text: 'نعم', onPress: () => navigation.navigate('Home') },
        { text: 'لا', style: 'cancel' },
      ]
    );
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('السلة فارغة', 'يرجى إضافة أصناف للسلة أولًا.');
      return;
    }
    navigation.navigate('Payment', { totalPrice });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>السلة</Text>
      {cart.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>السلة فارغة</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text>السعر: {item.price} شيكل</Text>
              <View style={styles.quantityControl}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontWeight: 'bold' }}>المجموع: {item.price * item.quantity} شيكل</Text>
            </View>
          )}
        />
      )}
      <Text style={[styles.title, { marginTop: 10 }]}>المجموع الكلي: {totalPrice} شيكل</Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
        <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 5 }]} onPress={handleAddMore}>
          <Text style={styles.buttonText}>إضافة المزيد</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 5, backgroundColor: '#007bff' }]} onPress={handleCheckout}>
          <Text style={styles.buttonText}>الدفع</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function PaymentScreen({ route, navigation }) {
  const { totalPrice } = route.params;
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePayment = (method) => {
    setSelectedPayment(method);
    Alert.alert('✅ تم الدفع', `تم دفع ${totalPrice} شيكل عبر ${method}`);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>اختر طريقة الدفع</Text>
      <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('كاش')}>
        <Ionicons name="cash" size={28} color="#28a745" />
        <Text style={styles.paymentText}>الدفع كاش</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentOption} onPress={() => handlePayment('فيزا')}>
        <Ionicons name="card" size={28} color="#007bff" />
        <Text style={styles.paymentText}>الدفع بفيزا</Text>
      </TouchableOpacity>
      {selectedPayment ? <Text style={{ marginTop: 15, fontSize: 16 }}>تم اختيار: {selectedPayment}</Text> : null}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'الأقسام' }} />
        <Stack.Screen name="Category" component={CategoryScreen} options={({ route }) => ({ title: route.params.categoryName })} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'تفاصيل الصنف' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'السلة' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'الدفع' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#333' },
  categoryCard: {
    flex: 1,
    backgroundColor: '#ffe6e1',
    margin: 8,
    borderRadius: 12,
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff6347',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  categoryName: { fontSize: 18, marginTop: 10, color: '#ff6347', fontWeight: '600' },
  foodCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#999',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  foodInfo: { flex: 1 },
  foodName: { fontSize: 18, fontWeight: '600', color: '#444' },
  foodPrice: { fontSize: 16, color: '#ff6347', marginTop: 4 },
  desc: { fontSize: 16, color: '#555', lineHeight: 22 },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 13,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ff6347',
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
  },
  link: {
    color: '#ff6347',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  cartItem: {
    backgroundColor: '#fff5f2',
    padding: 15,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: '#ff6347',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  qtyBtn: {
    backgroundColor: '#ff6347',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  qtyBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  qtyText: {
    marginHorizontal: 15,
    fontSize: 18,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  paymentText: {
    fontSize: 18,
    marginLeft: 15,
  },
});
