'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Stack, Typography, TextField, Button } from "@mui/material";
import { collection, getDocs, query, getDoc, deleteDoc, setDoc, doc, where } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const[itemName, setItemName] = useState('')
  const [searchResult, setSearchResult] = useState(null)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  
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

  const handleOpen = (modalType) => {
    setOpen(true)
    if (modalType === 'search') {
      setIsSearchModalOpen(true)
      setIsAddModalOpen(false)
      setSearchResult(null) // Clear previous search results
    } else if (modalType === 'add') {
      setIsSearchModalOpen(false)
      setIsAddModalOpen(true)
      setItemName('') // Clear item name
    }
  }
  const handleClose = () => setOpen(false)

  const addItem =  async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc (docRef)

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
    const docSnap = await getDoc (docRef)

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

  // Search Item 
  const searchItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        setSearchResult({
          id: docSnap.id,
          ...data
        });
  
      } else {
        
        setSearchResult(null);
      }

    }

  return (
    <Box 
      width = "100vw"
      height = "100vh" 
      display ="flex" 
      justifyContent = "center"
      flexDirection="column" 
      alignItems= "center"
      gap = {2}
      >
      
      {/* Add modal */}
      <Modal open = {open  && isAddModalOpen} onClose = {handleClose}>
      
        <Box 
          position = "absolute" 
          top = "50%"
          left = "50%" 
          width = {400}
          bgcolor="white"
          border = "2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx ={{
                transform: "translate(-50%, -50%)"
          }}
          >
          <Button
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 'auto',
              padding: 0,
              color: 'black'
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>&times;</Typography>
          </Button>
            <Typography variant="h6">Add Item</Typography>
            <Stack width = "100%" direction = "row" spacing ={2}>
              <TextField
              variant="outlined"
              fullWidth
              values = {itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
              />

              <Button variant = "outlined" onClick ={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}>
                Add
                </Button>
            </Stack>
        </Box>
      </Modal>

      {/* Search Modal */}
      <Modal open = {open && isSearchModalOpen} onClose = {handleClose}>
      
      <Box 
        position = "absolute" 
        top = "50%"
        left = "50%" 
        width = {400}
        bgcolor="white"
        border = "2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx ={{
              transform: "translate(-50%, -50%)"
        }}
        >
          <Button
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 'auto',
              padding: 0,
              color: 'black'
            }}
          >
            <Typography variant="h6" sx={{ fontSize: '1.5rem' }}>&times;</Typography>
          </Button>
          
          <Typography variant="h6">Search Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                searchItem(itemName);
                // handleClose();
              }}
            >
              Search
            </Button>
          </Stack>
          {searchResult ? (
          <Box mt={2}>
            <Typography variant="h6">{searchResult.name}</Typography>
            <Typography>Quantity: {searchResult.quantity}</Typography>
          </Box>
        ) : (
          <Box mt={2}>
            <Typography>No results found.</Typography>
          </Box>
        )}
      </Box>
    </Modal>


     <Box border = "1px solid #333">
      <Box width= "800px" height="100px"
      bgcolor = "#ADD8E6" alignItems = "center"
      justifyContent="center" display="flex">
        <Typography variant = "h2" color = "#333">Inventory Items</Typography>
      </Box>
     
     <Stack width = "800px" height = "300px" spacing = {2} overflow = "auto">
      {
        inventory.map(({name, quantity})=> (
          <Box key = {name} 
          width = "100%" 
          minHeight = "100px" 
          display = "flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor="#f0f0f0"
          padding={5}>
             
            <Typography variant = "h4" color = "#333" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant = "h4" color = "#333" textAlign="center">
              {quantity}
            </Typography>

            <Stack direction="row" spacing = {2}>
            <Button 
            variant = "contained" 
            onClick={() => {
              addItem(name)
            }}>
              Add
            </Button>

            <Button 
            variant = "contained" 
            onClick={() => {
              removeItem(name)
            }}>
              Remove
            </Button>
            </Stack>    
          </Box>
        ))
      }
     </Stack>
    </Box>

    <Stack direction="row" spacing = {2}>
    <Button variant="contained" onClick={() =>{
        handleOpen('add')
      }}>
        Add new item
      </Button>

    <Button variant = "contained" onClick={() => {
      handleOpen('search')
    }}>
      Search</Button> 
    </Stack>

  </Box>

  );
}
