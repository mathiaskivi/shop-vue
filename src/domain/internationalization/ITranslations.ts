export interface ITranslations {
    'areas': {
        'identity': {
            'pages': {
                'account': {
                    'login': {
                        'loading': string;
                        'logIn': string;
                        'email': string;
                        'password': string;
                        'registerNewUser': string;
                        'success': string;
                        'useLocalAccount': string;
                    },
                    'register': {
                        'buttonRegister': string;
                        'confirmPassword': string;
                        'createNewAccount': string;
                        'email': string;
                        'firstName': string;
                        'lastName': string;
                        'loading': string;
                        'pageTitle': string;
                        'password': string;
                        'phoneNumber': string;
                        'success': string;
                    }
                }
            }
        }
    },
    'common': {
        'errorMessage_AttemptedValueIsInvalid': string;
        'errorMessage_Email': string;
        'errorMessage_MaxLength': string;
        'errorMessage_MinLength': string;
        'errorMessage_MissingBindRequiredValue': string;
        'errorMessage_MissingKeyOrValue': string;
        'errorMessage_MissingRequestBodyRequiredValue': string;
        'errorMessage_NonPropertyAttemptedValueIsInvalid': string;
        'errorMessage_NonPropertyUnknownValueIsInvalid': string;
        'errorMessage_NonPropertyValueMustBeANumber': string;
        'errorMessage_NotValidPhone': string;
        'errorMessage_Range': string;
        'errorMessage_Required': string;
        'errorMessage_StringLengthMax': string;
        'errorMessage_StringLengthMinMax': string;
        'errorMessage_UnknownValueIsInvalid': string;
        'errorMessage_ValueIsInvalid': string;
        'errorMessage_ValueMustBeANumber': string;
        'errorMessage_ValueMustNotBeNull': string;
    },
    'views': {
        'cart': {
            'index': {
                'cart': string;
                'chooseShipping': string;
                'continueShopping': string;
                'price': string;
                'product': string;
                'quantity': string;
                'subtotal': string;
                'total': string;
                'yourCartIsEmpty': string;
            },
            'shipping': {
                'choose': string;
                'goToCheckout': string;
                'location': string;
                'provider': string;
                'title': string;
            }
        },
        'categories': {
            'create': {
                'backToList': string;
                'category': string;
                'name': string;
                'title': string;
            },
            'delete': {
                'areYouSure': string;
                'backToList': string;
                'category': string;
                'name': string;
                'title': string;
            },
            'details': {
                'backToList': string;
                'category': string;
                'edit': string;
                'name': string;
                'title': string;
            },
            'edit': {
                'backToList': string;
                'category': string;
                'name': string;
                'save': string;
                'title': string;
            },
            'index': {
                'create': string;
                'delete': string;
                'details': string;
                'edit': string;
                'name': string;
                'title': string;
            }
        },
        'checkout': {
            'failure': {
                'goToHomepage': string;
                'ifYouThinkThisIsAnError': string;
                'payment': string;
                'paymentFailed': string;
                'unfortunatelyYourPaymentFailed': string;
            },
            'index': {
                'payWith': string;
                'price': string;
                'product': string;
                'quantity': string;
                'shipping': string;
                'title': string;
                'total': string;
                'youWillBeRedirectedToPayPal': string;
            },
            'success': {
                'payment': string;
                'paymentWasSuccessful': string;
                'viewOrder': string;
                'yourOrderHasBeenPlaced': string;
            }
        },
        'home': {
            'index': {
                'addToCart': string;
                'bestSellers': string;
                'nowAvailable': string;
                'nowAvailablePrice': string;
                'outOfStock': string;
                'takeALook': string;
                'title': string;
            }
        },
        'locations': {
            'create': {
                'address': string;
                'backToList': string;
                'location': string;
                'name': string;
                'provider': string;
                'title': string;
            },
            'delete': {
                'address': string;
                'areYouSure': string;
                'backToList': string;
                'location': string;
                'name': string;
                'provider': string;
                'title': string;
            },
            'details': {
                'address': string;
                'backToList': string;
                'edit': string;
                'location': string;
                'name': string;
                'provider': string;
                'title': string;
            },
            'edit': {
                'address': string;
                'backToList': string;
                'location': string;
                'name': string;
                'provider': string;
                'save': string;
                'title': string;
            },
            'index': {
                'address': string;
                'create': string;
                'delete': string;
                'details': string;
                'edit': string;
                'name': string;
                'provider': string;
                'title': string;
            }
        },
        'orderProducts': {
            'create': {
                'backToList': string;
                'order': string;
                'orderProduct': string;
                'product': string;
                'quantity': string;
                'title': string;
            },
            'delete': {
                'areYouSure': string;
                'backToList': string;
                'order': string;
                'orderProduct': string;
                'product': string;
                'quantity': string;
                'title': string;
            },
            'details': {
                'backToList': string;
                'edit': string;
                'order': string;
                'orderProduct': string;
                'product': string;
                'quantity': string;
                'title': string;
            },
            'edit': {
                'backToList': string;
                'order': string;
                'orderProduct': string;
                'product': string;
                'quantity': string;
                'save': string;
                'title': string;
            },
            'index': {
                'create': string;
                'delete': string;
                'details': string;
                'edit': string;
                'order': string;
                'product': string;
                'quantity': string;
                'title': string;
            }
        },
        'orders': {
            'create': {
                'appUser': string;
                'backToList': string;
                'dateTime': string;
                'location': string;
                'order': string;
                'status': string;
                'title': string;
                'total': string;
                'tracking': string;
            },
            'delete': {
                'appUser': string;
                'areYouSure': string;
                'backToList': string;
                'dateTime': string;
                'location': string;
                'order': string;
                'status': string;
                'title': string;
                'total': string;
                'tracking': string;
            },
            'details': {
                'amount': string;
                'cart': string;
                'name': string;
                'order': string;
                'phone': string;
                'price': string;
                'product': string;
                'quantity': string;
                'recipient': string;
                'shipping': string;
                'total': string;
                'tracking': string;
                'transactions': string;
            },
            'edit': {
                'appUser': string;
                'backToList': string;
                'dateTime': string;
                'location': string;
                'order': string;
                'save': string;
                'status': string;
                'title': string;
                'total': string;
                'tracking': string;
            },
            'index': {
                'date': string;
                'order': string;
                'status': string;
                'title': string;
                'total': string;
            }
        },
        'pictures': {
            'create': {
                'cancel': string;
                'path': string;
                'picture': string;
                'title': string;
            },
            'delete': {
                'areYouSure': string;
                'cancel': string;
                'path': string;
                'picture': string;
                'product': string;
                'title': string;
            },
            'index': {
                'path': string;
                'product': string;
                'title': string;
            }
        },
        'products': {
            'create': {
                'backToList': string;
                'category': string;
                'description': string;
                'name': string;
                'price': string;
                'product': string;
                'quantity': string;
                'sold': string;
                'title': string;
            },
            'delete': {
                'areYouSure': string;
                'backToList': string;
                'category': string;
                'description': string;
                'name': string;
                'price': string;
                'product': string;
                'quantity': string;
                'sold': string;
                'title': string;
            },
            'details': {
                'addToCart': string;
                'inStock': string;
                'outOfStock': string;
                'title': string;
            },
            'edit': {
                'add': string;
                'backToList': string;
                'category': string;
                'delete': string;
                'description': string;
                'name': string;
                'none': string;
                'pictures': string;
                'price': string;
                'product': string;
                'quantity': string;
                'save': string;
                'sold': string;
                'title': string;
            },
            'index': {
                'addToCart': string;
                'categoriesNotFound': string;
                'category': string;
                'clear': string;
                'outOfStock': string;
                'products': string;
                'productsNotFound': string;
                'sortBy': string;
                'sortByAlphabeticallyAZ': string;
                'sortByAlphabeticallyZA': string;
                'sortByBestSellers': string;
                'sortByPriceHL': string;
                'sortByPriceLH': string;
            }
        },
        'providers': {
            'create': {
                'backToList': string;
                'name': string;
                'price': string;
                'provider': string;
                'title': string;
            },
            'delete': {
                'areYouSure': string;
                'backToList': string;
                'name': string;
                'price': string;
                'provider': string;
                'title': string;
            },
            'details': {
                'backToList': string;
                'edit': string;
                'name': string;
                'price': string;
                'provider': string;
                'title': string;
            },
            'edit': {
                'backToList': string;
                'name': string;
                'price': string;
                'provider': string;
                'save': string;
                'title': string;
            },
            'index': {
                'create': string;
                'delete': string;
                'details': string;
                'edit': string;
                'name': string;
                'price': string;
                'title': string;
            }
        },
        'shared': {
            '_CartPartial': {
                'cart': string;
            },
            '_LanguagePartial': {
                'language': string;
            },
            '_Layout': {
                'brand': string;
                'products': string;
                'seller': string;
            },
            '_LoginPartial': {
                'login': string;
                'logout': string;
                'manage': string;
                'register': string;
                'categories': string;
                'locations': string;
                'orderProducts': string;
                'orders': string;
                'pictures': string;
                'providers': string;
                'roles': string;
                'statuses': string;
                'transactions': string;
                'userRoles': string;
                'users': string;
            }
        },
        'statuses': {
            'create': {
                'backToList': string;
                'name': string;
                'status': string;
                'title': string;
            },
            'delete': {
                'areYouSure': string;
                'backToList': string;
                'name': string;
                'status': string;
                'title': string;
            },
            'details': {
                'backToList': string;
                'edit': string;
                'name': string;
                'status': string;
                'title': string;
            },
            'edit': {
                'backToList': string;
                'name': string;
                'save': string;
                'status': string;
                'title': string;
            },
            'index': {
                'create': string;
                'delete': string;
                'details': string;
                'edit': string;
                'name': string;
                'title': string;
            }
        },
        'transactions': {
            'create': {
                'amount': string;
                'backToList': string;
                'order': string;
                'title': string;
                'transaction': string;
            },
            'delete': {
                'amount': string;
                'areYouSure': string;
                'backToList': string;
                'order': string;
                'title': string;
                'transaction': string;
            },
            'details': {
                'amount': string;
                'backToList': string;
                'edit': string;
                'order': string;
                'title': string;
                'transaction': string;
            },
            'edit': {
                'amount': string;
                'backToList': string;
                'order': string;
                'save': string;
                'title': string;
                'transaction': string;
            },
            'index': {
                'amount': string;
                'create': string;
                'delete': string;
                'details': string;
                'edit': string;
                'order': string;
                'title': string;
            }
        }
    }
}
