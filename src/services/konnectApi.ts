const KONNECT_API_URL = 'https://api.preprod.konnect.network/api/v2';
const KONNECT_API_KEY = '657af1930bef8bdfd045b3a3:QnAJoNiMYb8g0LAlbdEbeFrc3brvAzu';
const RECEIVER_WALLET_ID = '5f7a209aeb3f76490ac4a3d1'; // Replace with your actual wallet ID

interface InitPaymentResponse {
  payUrl: string;
  paymentRef: string;
}

interface KonnectPaymentRequest {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  orderId: string;
}

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
        token: 'TND',
        type: 'immediate',
        description: `Order #${orderId}`,
        acceptedPaymentMethods: ['bank_card', 'e-DINAR'],
        firstName,
        lastName,
        email,
        orderId,
        successUrl: `${window.location.origin}/payment-success`,
        failUrl: `${window.location.origin}/payment-failure`,
        theme: 'light',
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