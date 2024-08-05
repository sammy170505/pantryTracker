'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { Firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";
import { collection, getDocs, query } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = usestate([])
  const [open, setOpen] = useState(false)
  const[itemName, setItemName] = useState('')

  //asyn doesn't lock the code while fetching
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    // Retrieve all documents that match the query from Firestore
    const docs = await getDocs (snapshot)
    const inventoryList = []
    
    //Iterate through each doc
    //push docId and docData into inventory
    docs.forEach ((doc) => {
      inventoryList.push({
        name: doc.id(),
        ...doc.data(),
      })
    })
  }

  return (
    <Box>
      <Typography variant = "h1">Inventory Management</Typography>
    </Box>
  );
}
y6