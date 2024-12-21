/**
 * Konnect Payment API Integration
 * 
 * This module handles the integration with Konnect's payment gateway API.
 * API Base URL: https://api.preprod.konnect.network/api/v2/
 */

const KONNECT_API_URL = 'https://api.preprod.konnect.network/api/v2';
const KONNECT_API_KEY = '657af1930bef8bdfd045b3a3:CByyyzIoQrdc3bLD';
const RECEIVER_WALLET_ID = '5f7a209aeb3f76490ac4a3d1';

interface InitPaymentResponse {
  payUrl: string;      // URL where the client will be redirected to make the payment
  paymentRef: string;  // Unique payment reference ID
}

interface KonnectPaymentRequest {
  amount: number;      // Amount in millimes (1000 millimes = 1 TND)
  firstName: string;   // Payer's first name
  lastName: string;    // Payer's last name
  email: string;       // Payer's email
  orderId: string;     // Your internal order reference
}

/**
 * Initializes a payment request with Konnect
 * 
 * @param {KonnectPaymentRequest} params - Payment initialization parameters
 * @returns {Promise<InitPaymentResponse>} Payment URL and reference
 * 
 * @throws Will throw an error if the API request fails
 */
export const initKonnectPayment = async ({
  amount,
  firstName,
  lastName,
  email,
  orderId,
}: KonnectPaymentRequest): Promise<InitPaymentResponse> => {
  try {
    const response = await fetch(`${KONNECT_API_URL}/payments/init-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': KONNECT_API_KEY,
      },
      body: JSON.stringify({
        receiverWalletId: RECEIVER_WALLET_ID,
        amount: amount * 1000, // Convert to millimes
        token: 'TND',         // Currency token
        type: 'immediate',    // Payment must be made in full
        description: `Order #${orderId}`,
        acceptedPaymentMethods: ['bank_card', 'e-DINAR'], // Available payment methods
        firstName,
        lastName,
        email,
        orderId,
        successUrl: `${window.location.origin}/payment-success`,
        failUrl: `${window.location.origin}/payment-failure`,
        theme: 'light',       // Payment gateway theme
      }),
    });

    if (!response.ok) {
      throw new Error('Payment initialization failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};

/**
 * Retrieves the status of a payment
 * 
 * @param {string} paymentId - The payment reference ID
 * @returns {Promise<any>} Payment status details
 * 
 * Payment Status:
 * - "completed": Payment was successful
 * - "pending": Payment has failed or not attempted yet
 */
export const getPaymentStatus = async (paymentId: string) => {
  try {
    const response = await fetch(`${KONNECT_API_URL}/payments/${paymentId}`, {
      headers: {
        'x-api-key': KONNECT_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get payment status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting payment status:', error);
    throw error;
  }
};
