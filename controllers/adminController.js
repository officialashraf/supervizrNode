const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel');
const vendorModel = require('../models/vendorModel');
const employeeModel = require('../models/employeeModel');

module.exports = {
 
  //check admin login for web 
  adminLogin: async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the admin by username and password
      const user = await adminModel.findOne({ username, password });
      
      if (!user) {
        return res.json({status:false, message: 'Invalid username or password' });
      }
  
    // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.SECRET_KEY, // Use a secure key stored in an environment variable
        { expiresIn: '7d' } // Token expiration time set to 7 days
      ); 

      console.log(token);
      // Respond with the token
      res.json({ status:true,message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.json({ status:false,message: 'Failed to log in' });
    }
  },

  //vendor list for admin
  vendorListing: async (req, res) => {
    
    try {
      // Fetch all vendors for the given userId
      const vendorList = await vendorModel.find()
      .select('vendorName vendorEmail vendorMobile vendorCompany subEndDate subStartDate status vandorCreated')
      .sort({ vandorCreated: -1 }) // Sort in descending order
      .exec();

      // Check if vendorList array is empty
      if (!vendorList || vendorList.length === 0) {
        return res.json({ status: false, message: 'Vendor list not found' });
      }
  
      // Send the client list in the response
      res.json({ status: true, message: 'Vendor list fetched successfully', data: vendorList });
  
    } catch (error) {
      console.error('Error fetching vendor list:', error);
      res.json({ status: false, message: 'Internal Server Error', error: error.message });
    }
  },

      //add vendor subscription plan
    addVendorSubscription: async (req, res) => {
      
      try {
          const { startDate, endDate, vendorId } = req.body;

          if (!vendorId) {
            return res.json({  status: false,error: 'Vendor id field is required' });
          }

          if (!startDate) {
              return res.json({ status: false, error: 'Start date field is required' });
          }

          if (!endDate) {
            return res.json({status: true, error: 'End date field is required' });
          }

          // Find the user by ID
          const vendor = await vendorModel.findById(vendorId);

          if (!vendor) {
              return res.json({ status: false, message: 'vendor not found' });
          }

          // subStartDate , subEndDate
          vendor.subStartDate = startDate || vendor.subStartDate;
          vendor.subEndDate = endDate || vendor.subEndDate;

          vendor.subscriptions.push({ startDate: startDate, endDate: endDate });

          // Save the updated user to the database
          await vendor.save();

          res.json({ status: true, message: 'Subsciption added successfully' });
      } catch (error) {
          console.error(error);
          res.json({  status: false ,message: 'Internal Server Error' });
      }
    },

    //update vendor subscription plan
    updateVendorStatus: async (req, res) => {

    try {
      const { vendorId } = req.body;
  
      // Validate that vendorId is provided
      if (!vendorId) {
        return res.json({status: false, error: 'Vendor ID is required' });
      }
  
      // Find the vendor by ID
      const vendor = await vendorModel.findById(vendorId);
  
      // Check if vendor exists
      if (!vendor) {
        return res.json({status: false, message: 'Vendor not found' });
      }
  
      // Toggle vendor status
      vendor.status = vendor.status === 'active' ? 'inactive' : 'active';
  
      // Determine the response message
      const message = vendor.status === 'active' ? 'Vendor activated successfully' : 'Vendor deactivated successfully';
  
      // Save the updated vendor
      await vendor.save();
  
      // Send the response
      res.json({status: true, message });
      
    } catch (error) {
      console.error('Error updating vendor status:', error);
      res.json({status: false, message: 'Internal Server Error' });
    }
},


   //dashbboardCounts 
   dashbboardCounts: async (req, res) => {
    try {
      // Fetch total vendors count
      const totalVendors = await vendorModel.countDocuments();
  
      // Fetch active vendors count
      const activeVendors = await vendorModel.countDocuments({ status: 'active' });
  
      // Fetch inactive vendors count
      const inactiveVendors = await vendorModel.countDocuments({ status: 'inactive' });
  
      // Return the counts in the response
      res.json({
        status: true,
        message: 'Dashboard counts fetched successfully',
        data: {
          totalVendors,
          activeVendors,
          inactiveVendors
        }
      });
  
    } catch (error) {
      console.error('Error fetching dashboard counts:', error);
      res.json({ status: false, message: 'Internal Server Error', error: error.message });
    }
},


  //recent vendor listing for admin
  RecentVendorListing: async (req, res) => {
    
    try {
      // Fetch the most recent 5 vendors based on the vendorCreated date
      const vendorList = await vendorModel.find()
          .select('vendorName vendorEmail vendorMobile vendorCompany subEndDate subStartDate status vandorCreated') // Corrected field name
          .limit(5) // Limit to 5 results
          .sort({ vandorCreated: -1 }) // Sort in descending order by vendorCreated
          .exec();
  
      // Check if vendorList array is empty
      if (!vendorList || vendorList.length === 0) {
          return res.json({ status: false, message: 'Recent vendor list not found' });
      }
  
      // Send the vendor list in the response
      res.json({ status: true, message: 'Recent vendor list fetched successfully', data: vendorList });
  
  } catch (error) {
      console.error('Error fetching recent vendor list:', error);
      res.json({ status: false, message: 'Internal Server Error', error: error.message });
  }
  
  },


  getEmpList: async (req, res) => {
    try {
        const { vendorId } = req.params;
        console.log('vendorId',vendorId);
        
        let query = { vendorId: vendorId };

        const employees = await employeeModel
          .find(query, 'fullname mobile status userType')  // Select specific fields and exclude 'otp'
          .sort({ _id: 1 });

        if (!employees || employees.length === 0) { // Check if employees array is empty
            return res.status(404).json({ message: 'Employees not found' });
        }

              // Check if vendorList array is empty
      if (!employees || employees.length === 0) {
        return res.json({ status: false, message: 'Employees list not found' });
      }
  
      // Send the client list in the response
      res.json({ status: true, message: 'Employees list fetched successfully', data: employees });
  
    } catch (error) {
      res.json({ status: false, message: 'Internal Server Error', error: error.message });
    }
},

  //delete employee 
  deleteEmployee: async (req, res) => {
    try {
        const { employeeId } = req.params;
        
        // Validate that employeeId is provided
        if (!employeeId) {
            return res.json({ status: false, error: 'Employee ID is required' });
        }
        
        // Find the employee by ID
        const employee = await employeeModel.findById(employeeId);
        
        // Check if employee exists
        if (!employee) {
            return res.json({ status: false, message: 'Employee not found' });
        }
        
        // Delete the employee
        await employee.deleteOne({ _id: employeeId });
        // Send the response
        res.json({ status: true, message: "Employee deleted successfully" });
        
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.json({ status: false, message: 'Internal Server Error' ,error});
    }
},



};
//module.exports end






