import { useStreamDeliveryLocation } from '@/features/order/hooks/useStreamDeliveryLocation'
import React from 'react'
import { Map } from 'react-kakao-maps-sdk'
import OrderTrackItem from './OrderTrackItem'
import { Address } from '@/features/order/types'

interface OrderTrackMapProps {
  storeAdress: Address
  userAddress: Address
}

const OrderTrackMap = ({ storeAdress, userAddress }: OrderTrackMapProps) => {
  const { deliveryLocation } = useStreamDeliveryLocation(1)

  return (
    <Map
      center={{
        lat: storeAdress.latitude,
        lng: storeAdress.longitude,
      }}
      className="h-full w-full"
      level={4}
      // zoomable={false}
    >
      <OrderTrackItem lat={storeAdress.latitude} lng={storeAdress.longitude} type="store" />
      <OrderTrackItem lat={userAddress.latitude} lng={userAddress.longitude} type="user" />

      {deliveryLocation && (
        <OrderTrackItem
          lat={deliveryLocation.latitude}
          lng={deliveryLocation.longitude}
          type="delivery"
        />
      )}
    </Map>
  )
}
export default OrderTrackMap
