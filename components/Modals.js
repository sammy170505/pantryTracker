
import { Box, Modal, Stack, Typography, TextField, Button } from "@mui/material";

const Modals = ({ open, handleClose, handleOpen, searchItem, searchResult, setSearchResult, itemName, setItemName, addItem }) => {
  return (
        <>
        {/* Add modal */}
        <Modal open = {open  && handleOpen === 'add'} onClose = {handleClose}>
      
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
      <Modal open = {open && handleOpen === 'search'} onClose = {handleClose}>
      
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
        </>
    )
}

export default Modals;



