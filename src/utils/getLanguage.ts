import { AllowedLangs } from '@/shared/constants/common';
import { cookies } from 'next/headers';

export async function getLanguage(): Promise<AllowedLangs> {
  const cookieStore = await cookies();
  const lang = cookieStore.get('harmonie_lang')?.value || 'uk';
  if (lang === 'uK' || lang === 'ru') {
    return lang as AllowedLangs;
  } else return AllowedLangs.UK;
}
