'use strict';

angular.module('trafficCMS.i18n')
.constant('en', {
  global: {
    loadingData: 'Loading data...',
    errorData: 'An error occured. Please try again.',
    actions: {
      back: 'Go Back'
    },
    languages: {
      english: 'English',
      arabic: 'Arabic'
    },
    fileInput: {
      selectImage: 'Choose..',
      changeImage: 'Change',
      removeImage: 'Remove'
    }
  },
  aside: {
    profile: 'My Profile',
    settings: 'Settings',
    logout: 'Logout',
    fullscreen: 'Fullscreen',
    fold: 'Folded aside',
    themes: 'Theming:',
    nav: {
      dashboard: 'Dashboard',
      maps: 'Maps',
      users: 'Users',
      buses: 'Buses',
      categories: 'Categories'
    }
  },
  login: {
    title: 'Sign in with your account',
    username: 'Username',
    password: 'Password',
    keepMe: 'Keep me signed in',
    submit: 'Login',
    forgotPass: 'Forgot password?',
    authField: 'Username, Email Or phone',
    error: {
      failed: 'Incorrect username or password!',
      notActvive: 'Your account is inactive. Please contact your system admin.'
    }
  },
  dashboard: {
    title: 'Dashboard',
    balance: 'Balance',
    offers: 'Popular Offers',
    products: 'Most Viewed Products',
    activities: 'Activities',
    updated: 'Updated 4 minutes',
    widgets: {
      products: 'Products',
      brands: 'Brands',
      branches: 'Brandches',
      vouchers: 'Vouchers'
    },
    followers: {
      latest: 'Latest Followers',
      visitors: 'Visitors',
      offers: 'Offers Sold'
    }
  },
  user: {
    username: 'Username',
    firstName: 'First Name',
    lastName: 'last Name',
    email: 'Email',
    password: 'Password',
    oldPassword: 'Old Password',
    newPassword: 'New Password',
    rePassword: 'Retype New Password',
    isActive: {
      title: 'Active?',
      true: 'Yes',
      false: 'No'
    },
    listPage: {
      title: 'Users',
      noData: 'No users yet. You can create one by using the button at the top.'
    },
    editPage: {
      myProfile: 'My Profile',
      new: 'New User',
      edit: 'Edit User',
      changePassword: 'Change Password'
    },
    actions: {
      new: 'New User',
      save: 'Save User',
      changePassword: 'Change Password'
    },
    deactivate: {
      title: 'Are You Sure?',
      text: 'Are you sure you want to deactivate {{username}}?',
      success: 'User: {{username}} deactivated successfully',
      error: 'Error in deactivating user!!',
      ok: 'Ok',
      cancel: 'Cancel',
      admin: 'Cannot deactivate Admin user',
      yourself: 'Cannot deactivate yourself'
    },
    activate: {
      title: 'Are You Sure?',
      text: 'Are you sure you want to activate {{username}}?',
      success: 'User: {{username}} activated successfully',
      error: 'Error in activating user!!'
    },
    errors: {
      'username.required': 'Username is required',
      'firstName.required': 'First name is required',
      'lastName.required': 'Last name is required',
      'email.required': 'Email is required',
      'password.required': 'Password is required',
      'password.notMatch': 'Passwords are not match!',
      formNotValid: 'Please make sure all mandatory fields are filled.',
      saveError: 'An error occurred while saving the user. Please try again.',
      changePassword: 'An error occurred while changing the password. Please try again.',
      oldNewPassReq: 'Old password and new password are required',
      noMatch: 'New password does not match the retyped password',
      oldPassWrong: 'Old password is incorrect'
    },
    'changePassword.success': 'Password changed successfully',
    'save.success': 'User saved successfully'
  },
  bus: {
    listPage: {
      title: 'Buses List'
    },
    actions: {
      new: 'New Bus',
      edit: 'Edit',
      save: 'Save',
      addStop: 'Add New Stop'
    },
    name: 'Bus Name',
    stopsNumber: 'Stops number',
    length: 'Length',
  },
  stop: {
    listPage: {
      title: 'Stops List'
    },
    actions: {
      edit: 'Edit the list',
      new: 'New'
    },
    name: 'Stop Name',
    lat: 'Lat',
    lng: 'Lng',
    order: 'Order'
  },
  map: {
    name: 'Title',
    image: 'Map Image',
    pois: 'No. POIS',
    poisTitle: 'POIS List',
    overlay: 'Overlay File',
    topLeftGPS: 'Top Left GPS Point',
    bottomRightGPS: 'Bottom Right GPS Point',
    poi: {
      x: 'X',
      y: 'Y',
      label: 'Label',
      url: 'URL',
      is3D: '3D?',
      isImage: 'Image?',
      gpsX: 'GPS X',
      gpsY: 'GPS Y',
      category: 'Category',
      scale: 'Scale',
      rotation: 'Rotation (degrees)'
    },
    listPage: {
      title: 'Maps',
      noData: 'No maps yet. You can create one by using the button at the top.'
    },
    editPage: {
      edit: 'Edit Map',
      new: 'New Map'
    },
    actions: {
      new: 'New Map',
      addMarker: 'New POI',
      selectImage: 'Choose Map Image',
      selectOverlay: 'Choose Overlay Image',
      uploadPOIImage: 'Upload Image',
      selectModelFile: 'Upload Model File',
      save: 'Save Map',
      reset: 'Reset Changes',
      viewOverlay: 'View Overlay Image',
      viewOriginal: 'View Map Image',
      removePOIs: 'Remove POIs'
    },
    errors: {
      chooseImage: 'Choose an image for map before you can add POIs.',
      formNotValid: 'Please make sure all mandatory fields are filled.',
      'name.required': 'Map title is mandatory',
      noPOIs: 'Please enter at least one POI',
      saveError: 'An error occurred while saving the map. Please try again.',
      nameFound: 'Map title already exists.',
      fileUpload: 'An error occurred while uploading the file. Please try again.',
      'topLeftGPS.required': 'Please enter top left GPS point',
      'bottomRightGPS.required': 'Please enter bottom right GPS point',
      'topLeftGPS.coordinates': 'Please make sure you enter the coordinates correctly',
      'bottomRightGPS.coordinates': 'Please make sure you enter the coordinates correctly'
    },
    'save.success': 'Map was saved successfully'
  },
  category: {
    name: 'Name',
    listPage: {
      title: 'Categories',
      noData: 'No Categories yet. You can create one by using the button at the top.'
    },
    editPage: {
      edit: 'Edit Category',
      new: 'New Category'
    },
    actions: {
      new: 'New Category',
      save: 'Save Category',
      delete: {
        title: 'Are you sure?',
        text: 'Are you sure you want to delete category {{categoryName}}?',
        ok: 'OK',
        cancel: 'Cancel',
        success: 'category {{categoryName}} was deleted successfully.',
        error: 'An error occured while deleting category.',
        used: 'Category {{categoryName}} is used in other maps'
      }
    },
    errors: {
      formNotValid: 'Please make sure all mandatory fields are filled.',
      'name.required': 'Category name is mandatory',
      saveError: 'An error occurred while saving the category. Please try again.',
      nameFound: 'Category name already exists.'
    },
    'save.success': 'Category was saved successfully'
  }
});
