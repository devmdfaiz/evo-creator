"use client"
import { PageComponents, PageWrapper } from '@/components/dashboard-layout/PaymentPageView/PageViewComponents';
import { useZustandSelector } from '@/context/zustand/slectors';
import { useFileHandler, usePageFormInputs } from '@/context/zustand/store';
import { TPagePrice } from '@/lib/types/index.type';
import React from 'react'

const Preview = () => {

  const pageInputsState = useZustandSelector(usePageFormInputs);
  const inputs = usePageFormInputs();
  const files = useFileHandler()

  console.log("prev page ", inputs)
  console.log("prev files ", files.imagesPreview)

  const color = inputs?.color?.hex;
  const theme = inputs?.template;

  const pagePrice: TPagePrice = {
    offerDiscountedPrice: inputs?.offerDiscountedPrice,
    price: inputs?.price,
    discountedPrice: inputs?.discountedPrice,
    priceType: inputs?.priceType,
    baseAuctionPrice: inputs?.baseAuctionPrice,
  };

  return (
    <>
    <PageWrapper
      color={color}
      fieldValue={inputs}
      theme={theme}
      mode={"preview"}
      pagePrice={pagePrice}
    >
      <PageComponents fieldValue={inputs}
      //  mode={"preview"}
        />
    </PageWrapper>
  </>
  )
}

export default Preview
