import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TransactionScreen = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Jatinangor House', amount: 25000, date: 'DANA' },
    { id: '2', title: 'Nasi Liwet', amount: 15000, date: 'DANA' },
    { id: '3', title: 'Ayam Sambal Dengkul', amount: 19000, date: 'GoPay' },
    { id: '4', title: 'Kuota Telkomsel', amount: 85000, date: 'DANA' },
    { id: '5', title: 'BBM Pertalite', amount: 30000, date: 'DANA' },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    category: 'Pengeluaran',
    account: '',
    date: ''
  });

  const addTransaction = () => {
    if (newTransaction.title && newTransaction.amount && newTransaction.account && newTransaction.date) {
      const transaction = {
        id: Date.now().toString(),
        title: newTransaction.title,
        amount: parseFloat(newTransaction.amount),
        date: newTransaction.account,
      };
      
      setTransactions([transaction, ...transactions]);
      setCurrentScreen('main');
      setNewTransaction({
        title: '',
        amount: '',
        category: 'Pengeluaran',
        account: '',
        date: ''
      });
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  const deleteTransaction = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          onPress: () => {
            setTransactions(transactions.filter(transaction => transaction.id !== id));
          },
          style: 'destructive'
        }
      ]
    );
  };

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.transactionItem}
      onLongPress={() => deleteTransaction(item.id)}
    >
      <View>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <Text style={styles.transactionAmount}>Rp{item.amount.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  const MainScreen = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaksi</Text>
        <View style={styles.balanceCard}>
          <View style={styles.incomeCard}>
            <Text style={styles.balanceAmount}>Rp. 250.000</Text>
            <Text style={styles.balanceLabel}>Your Income</Text>
          </View>
          <View style={styles.transactionCard}>
            <Text style={styles.transactionTotal}>Rp. 449.500</Text>
            <Text style={styles.transactionLabel}>Total Transaction</Text>
          </View>
        </View>
        <Text style={styles.lastTransactionTitle}>Last Transaction</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        style={styles.transactionList}
      />
    </>
  );

  const AddScreen = () => (
    <View style={styles.addContainer}>
      <View style={styles.addHeader}>
        <TouchableOpacity onPress={() => setCurrentScreen('main')}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.addHeaderTitle}>Add Transaction</Text>
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Type here for new title</Text>
          <TextInput
            style={styles.input}
            value={newTransaction.title}
            onChangeText={(text) => setNewTransaction({...newTransaction, title: text})}
            placeholder="Enter title"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Enter the amount</Text>
          <TextInput
            style={styles.input}
            value={newTransaction.amount}
            onChangeText={(text) => setNewTransaction({...newTransaction, amount: text})}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Category</Text>
          <TextInput
            style={styles.input}
            value={newTransaction.category}
            onChangeText={(text) => setNewTransaction({...newTransaction, category: text})}
            placeholder="Enter category"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Account</Text>
          <TextInput
            style={styles.input}
            value={newTransaction.account}
            onChangeText={(text) => setNewTransaction({...newTransaction, account: text})}
            placeholder="Enter account"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date</Text>
          <TextInput
            style={styles.input}
            value={newTransaction.date}
            onChangeText={(text) => setNewTransaction({...newTransaction, date: text})}
            placeholder="Enter date"
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={addTransaction}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'main' && <MainScreen />}
      {currentScreen === 'add' && <AddScreen />}

      {currentScreen !== 'add' && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setCurrentScreen('add')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navText, styles.activeNavText]}>Transaksi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Rekening</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Rekap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Hutang</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Setting</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balanceCard: {
    marginBottom: 20,
  },
  incomeCard: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: '#C8FB00',
    padding: 15,
    borderRadius: 10,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceLabel: {
    color: '#888888',
    fontSize: 14,
    marginTop: 5,
  },
  transactionTotal: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionLabel: {
    color: '#000000',
    fontSize: 14,
    marginTop: 5,
  },
  lastTransactionTitle: {
    color: '#888888',
    fontSize: 16,
    marginBottom: 10,
  },
  transactionList: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  transactionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
  },
  transactionAmount: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#C8FB00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#222222',
    paddingBottom: 25,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#888888',
    fontSize: 12,
  },
  activeNavText: {
    color: '#C8FB00',
  },
  addContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  addHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    color: '#FFFFFF',
    fontSize: 24,
    marginRight: 20,
  },
  addHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#888888',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#C8FB00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionScreen;