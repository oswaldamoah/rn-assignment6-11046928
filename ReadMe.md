# DCIT202 ASSIGNMENT 6

## 11042928

### Components

- **HomeScreen**: Displays a list of available products. Each product includes an image, name, description, price, and an "Add to Cart" button.
- **CartScreen**: Displays selected items in the cart. Each cart item includes an image, name, description, price, quantity, and a "Remove from Cart" button.
- **Prodcut**: It is the component that structures each of the products displayed in the HomeScreen

### Functionality

- **View Available Products**: Users can see a list of available products on the HomeScreen.
- **Add to Cart**: Users can add products to their cart from the HomeScreen.
- **Remove from Cart**: Users can remove products from their cart in the CartScreen.
- **View Cart Items**: Users can view the items in their cart on the CartScreen.

### Data Storage

- **Local Storage**: I used AsyncStorage to store selected items locally on the device. This ensures that the cart persists across app sessions.

## Implementation
### HomeScreen

1. **State Management**: 
   - `products`: Stores the list of available products.
   - `cart`: Stores the items in the cart.

2. **useEffect**:
   - Loads the list of products.
   - Loads the cart from AsyncStorage.

3. **addToCart Function**:
   - Adds a product to the cart or increments the quantity if the product already exists.
   - Updates the cart state and stores it in AsyncStorage.

### CartScreen

1. **State Management**:
   - `cart`: Stores the items in the cart.

2. **useEffect**:
   - Loads the cart from AsyncStorage.

3. **removeFromCart Function**:
   - Decreases the quantity of a product or removes it if the quantity is 1.
   - Updates the cart state and stores it in AsyncStorage.

## Screenshots

### HomeScreen

![HomeScreen](.\my-app\assets\screenshots\ss1.png)

### CartScreen

![CartScreen](.\my-app\assets\screenshots\ss2.png)

---