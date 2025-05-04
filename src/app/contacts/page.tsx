import React from 'react';
import { Metadata } from 'next';
import { Contacts } from '@/shared/components/common/Contacts/Contacts';

export const metadata: Metadata = {
  title: 'About Harmonie Shop',
  description: 'About Harmonie Shop',
};

export default async function ContactsPage() {
  return <Contacts />;
}
