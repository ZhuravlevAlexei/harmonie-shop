'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLang } from '@/shared/hooks/useLang';
import { useCartStore } from '@/shared/store/cart';
import { createOrder } from '@/actions/orders';

import { Cart } from '../Cart/Cart';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { AddressForm } from '../AddressForm/AddressForm';
import { Button } from '../Button/Button';

import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/shared/constants/checkout-form-schema';
import { OrderType } from '@/db/models/order';

import css from './Checkout.module.css';
import { getNameMultilang } from '@/shared/utils/getNameMultilang';

export const Checkout: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const { lang, translations } = useLang();
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      deliveryType: null,
      location: null,
      division: null,
      deliveryLocation: '',
      comment: '',
    },
  });
  const { handleSubmit, register } = form;

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setLoading(true);
      const cartItems = useCartStore.getState().items.map(item => {
        return {
          productId: Number(item.product.id),
          main_image: item.product.main_image,
          name: getNameMultilang(item.product, lang),
          quantity: Number(item.quantity),
          price: Number(item.product.price),
        };
      });
      const totalAmount = useCartStore.getState().totalAmount;
      const payload = {
        orderDate: new Date(),
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        comment: data.comment,
        deliveryType: data.deliveryType?.value,
        location: data.location?.value.city,
        deliveryLocation: data.deliveryLocation,
        division: data.division?.value,
        items: cartItems,
        totalAmount: totalAmount,
        status: 'new',
      } as OrderType;

      // создаем ордер в базе и посылаем письма покупателю что купил и спасибо за покупку
      //  и менеджеру о новом заказе
      const success = await createOrder(payload);
      if (!success) {
        throw new Error('Error creating order in database');
      }
      // чистим корзину
      // useCartStore.getState().clearCart();

      // переходим на страницу благодарности на 10 секунд, благодарим
      // покупателя за покупку и переходим на главную
    } catch (error) {
      setLoading(false);
      console.log('error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={css.checkout__wrapper}>
      <div className={css.checkout__data__wrapper}>
        <h3>{translations[lang].checkout.title}</h3>
        <FormProvider {...form}>
          <form
            className={css.checkout__form}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
            noValidate
          >
            <ContactsForm />
            <AddressForm />
            <textarea
              className={css.checkout__comment}
              id="comment"
              placeholder={translations[lang].checkout.comment}
              {...register('comment')}
            ></textarea>
            <Button
              className={css.checkout__submit__button}
              type="submit"
              loading={loading}
            >
              {translations[lang].checkout.create_order}
            </Button>
          </form>
        </FormProvider>
      </div>
      <div>
        <Cart forCheckout={true} />
      </div>
    </div>
  );
};
