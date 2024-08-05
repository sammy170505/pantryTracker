'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const[itemName, setItemName] = useState('')

  // asyn functions doesn't lock the code while fetching
  // Fetch and process data
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    // Retrieve all documents that match the query from Firestore
    const docs = await getDocs (snapshot)
    const inventoryList = []
    
    //Iterate through each doc
    //push docId and docData into inventory
    docs.forEach ((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  //Runs only once because [] (dependany array) is empty
  useEffect(() =>{
    updateInventory()
  }, [])

  const addItem =  async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDocs (docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
      }
      else{
        await setDoc(docRef, {quantity: 1})
      }

    await updateInventory()
  }

  const removeItem =  async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDocs (docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1){
        await deleteDoc(docRef)
      }
      else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }


  return (
    <Box>
      <Typography variant = "h1">Inventory Management</Typography>
      {inventory.forEach((item) => {
          console.log(item)
          return (
          <Box>
          {item.name}
          {item.count}
          </Box>
          )
        })}
    </Box>
  );
}