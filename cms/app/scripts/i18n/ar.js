'use strict';

angular.module('trafficCMS.i18n')
.constant('ar', {
  global: {
    loadingData: 'جاري التحميل...',
    errorData: 'حصل خطأ أثناء التحميل. يرحى المحاولة مجدداً.',
    actions: {
      back: 'عودة'
    },
    languages: {
      english: 'الإنكليزية',
      arabic: 'العربية'
    },
    fileInput: {
      selectImage: 'اختر صورة',
      changeImage: 'تغيير',
      removeImage: 'إزالة'
    }
  },
  aside: {
    profile: 'صفحتي الشخصية',
    settings: 'الإعدادات',
    logout: 'تسجيل خروج',
    fullscreen: 'ملء الشاشة',
    fold: 'تصغير القائمة',
    themes: 'الألوان',
    nav: {
      dashboard: 'الصفحة الرئيسية',
      maps: 'الخرائط',
      users: 'المستخدمون',
      categories: 'الفئات'
    }
  },
  login: {
    title: 'تسجيل الدخول',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    keepMe: 'تذكرني',
    submit: 'تسجيل الدخول',
    forgotPass: 'نسيت كلمة المرور؟',
    error: {
      failed: 'اسم المستخدم أو كلمة المرور غير صحيحة!',
      notActvive: 'حسابك غير فعال. يرجى مراجعة مدير النظام'
    }
  },
  dashboard: {
    title: 'الصفحة الرئيسية',
    balance: 'الرصيد',
    offers: 'العروض المتوفرة',
    products: 'أكثر المنتجات مشاهدة',
    activities: 'النشاطات',
    updated: 'منذ 4 دقائق',
    widgets: {
      products: 'المنتجات',
      brands: 'العلامات التجارية',
      branches: 'الفروع',
      vouchers: 'القسائم'
    },
    followers: {
      latest: 'آخر المتابعون',
      visitors: 'الزوار',
      offers: 'العروض المباعة'
    }
  },
  user: {
    username: 'اسم المستخدم',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    oldPassword: 'كلمة المرور القديمة',
    newPassword: 'كلمة المرور الجديدة',
    rePassword: 'إعادة كلمة المرور الجديدة',
    isActive: {
      title: 'فعال؟',
      true: 'نعم',
      false: 'لا'
    },
    listPage: {
      title: 'المستخدمون',
      noData: 'لا يوجد مستخدمين. يمكنك إنشاء مستخدمين عن طريق الزر في الأعلى.'
    },
    editPage: {
      myProfile: 'صفحتي الشخصية',
      new: 'مستخدم جديد',
      edit: 'تعديل مستخدم',
      changePassword: 'تغيير كلمة المرور'
    },
    actions: {
      new: 'مستخدم جديد',
      save: 'حفظ المستخدم',
      changePassword: 'تغيير كلمة المرور'
    },
    deactivate: {
      title: 'هل أنت متأكد؟',
      text: 'هل أنت متأكد من أنك تريد إلغاء تفعيل {{username}}؟',
      success: 'تم إلغاء تفعيل المستخدم: {{username}} بنجاح',
      error: 'حصل خطأ أثناء إلغاء تفعيل المستخدم!!',
      ok: 'نعم',
      cancel: 'إلغاء',
      admin: 'لا يمكنك إلغاء تفعيل المستخدم المدير',
      yourself: 'لا يمكنك إلغاء تفعيل نفسك'
    },
    activate: {
      title: 'هل أنت متأكد؟',
      text: 'هل أنت متأكد من أنك تريد تفعيل {{username}}؟',
      success: 'تم تفعيل المستخدم: {{username}} بنجاح',
      error: 'حصل خطأ أثناء تفعيل المستخدم!!'
    },
    errors: {
      'name.required': 'اسم المستخدم إلزامي',
      'email.required': 'البريد الإلكتروني إلزامي',
      'password.required': 'كلمة المرور إلزامية',
      formNotValid: 'يرجى إدخال جميع الحقول الألزامية.',
      saveError: 'حصل خطأ ما أثناء حفظ المستخدم. يرجى المحاولة مجدداً.',
      changePassword: 'حصل خطأ ما أثناء تغيير كلمة المرور. يرجى المحاولة مجدداً..',
      oldNewPassReq: 'كلمة المرور القديمة والجديدة إلزاميتان',
      noMatch: 'كلمة المرور الجديدة وإعادتها غير متطابقتين',
      oldPassWrong: 'كلمة المرور القديمة غير صحيحة'
    },
    'changePassword.success': 'تم تغيير كلمة المرور بنجاح',
    'save.success': 'تم حفظ المستخدم بنجاح'
  },
  map: {
    name: 'العنوان',
    image: 'صورة الخريطة',
    pois: 'عدد النقاط',
    poisTitle: 'قائمة النقاط',
    overlay: 'صورة الغطاء',
    topLeftGPS: 'إحداثيات النقطة العليا اليسرى',
    bottomRightGPS: 'إحاثيات النقطة السفلى اليمنى',
    poi: {
      x: 'X',
      y: 'Y',
      label: 'الاسم',
      url: 'الرابط',
      is3D: 'ثلاثية الأبعاد؟',
      isImage: 'صورة؟',
      gpsX: 'GPS X',
      gpsY: 'GPS Y',
      category: 'الفئة',
      scale: 'المقياس',
      rotation: 'الدوران (درجات)'
    },
    categories: {
      business: 'أعمال',
      education: 'تعليمي'
    },
    listPage: {
      title: 'الخرائط',
      noData: 'ﻻ يوجد خرائط بعد. يمكنك إنشاء خرائط عن طريق الزر في الأعلى.'
    },
    editPage: {
      edit: 'تعديل خريطة',
      new: 'خريطة جديدة'
    },
    actions: {
      new: 'خريطة جديدة',
      addMarker: 'نقطة جديدة',
      selectImage: 'اختر صورة الخريطة',
      selectOverlay: 'اختر ملف الغطاء',
      uploadPOIImage: 'تحميل صورة',
      selectModelFile: 'تحميل ملف',
      save: 'حفظ الخريطة',
      reset: 'إلغاء التعيلات',
      viewOverlay: 'عرض صورة الغطاء',
      viewOriginal: 'عرض صورة الخريطة',
      removePOIs: 'إزالة جميع النقاط'
    },
    errors: {
      chooseImage: 'اختر صورة للخريطة أولاً قبل أن تضيف النقاط.',
      formNotValid: 'يرجى إدخال جميع الحقول الألزامية.',
      'name.required': 'عنوان الخريطة إلزامي',
      noPOIs: 'يرجى إدخال نقطة واحدة على الأقل',
      saveError: 'حصل خطأ أثناء حفظ الخريطة. يرجى المحاولة مجدداً.',
      nameFound: 'عنوان الخريطة موجود مسبقاً.',
      fileUpload: 'حدث خطأ أثناء رفع الملف. يرجى المحاولة مجدداً.',
      'topLeftGPS.required': 'يرجى إدخال إحدائيات النقطة العليا اليسرى',
      'bottomRightGPS.required': 'يرجى إدخال إحدائيات النقطة السفلى اليمنى',
      'topLeftGPS.coordinates': 'يرجى إدخال الإحدائيات بالطريقة الصحيحة',
      'bottomRightGPS.coordinates': 'يرجى إدخال الإحدائيات بالطريقة الصحيحة'
    },
    'save.success': 'تم حفظ الخريطة بنجاح'
  },
  category: {
    name: 'الاسم',
    listPage: {
      title: 'الفئات',
      noData: 'لا يوجد فئات بعد. يمكنك إنشاء واحدة عن طريق الزر في الأعلى.'
    },
    editPage: {
      edit: 'تعديل فئة',
      new: 'فئة جديدة'
    },
    actions: {
      new: 'فئة جديدة',
      save: 'حفظ الفئة',
      delete: {
        title: 'هل أنت متأكد؟',
        text: 'هل أنت متأكد من أنك تريد حذف الفئة {{categoryName}}؟',
        ok: 'نعم',
        cancel: 'إلغاء',
        success: 'تم حذف الفئة {{categoryName}} بنجاح.',
        error: 'حصل خطأ أثناء حذف الفئة.',
        used: 'الفئة {{categoryName}} مستعملة في الخرائط'
      }
    },
    errors: {
      formNotValid: 'يرجى التأكد من أن جميع الحقول الإلزامية مدخلة.',
      'name.required': 'اسم الفئة إلزامي',
      saveError: 'حصل خطأ أثناء حفظ الفئة. يرجى المحاولة مجدداً.',
      nameFound: 'اسم الفئة موجود مسبقاً.'
    },
    'save.success': 'تم حفظ الفئة بنجاح'
  }
});
