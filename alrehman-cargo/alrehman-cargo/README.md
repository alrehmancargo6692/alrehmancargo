# الرحمن کارگو سروسز

Next.js 15 + Supabase پر مکمل اردو کارگو بکنگ ویب ایپ۔ عوامی ویب سائٹ، درخواست فارم، محفوظ ایڈمن پینل، کرایہ/مالک کی ادائیگی/دیگر اخراجات/وصولی/بقایا/منافع، بکنگ نمبر، پرنٹ بلٹی و انوائس، ریسپانسیو UI اور PWA شامل ہیں۔

## شروع کرنے کے مراحل

1. ZIP کھول کر اس فولڈر میں VS Code ٹرمینل کھولیں۔ `npm install` چلائیں۔
2. Supabase میں نیا project بنائیں؛ SQL Editor میں `schema.sql` کا مکمل متن چلائیں۔
3. Authentication → Users میں اپنا ایڈمن ای میل/پاس ورڈ والا user بنائیں۔ پھر SQL Editor میں یہ چلا کر اسی ای میل کو ایڈمن بنائیں:
   ```sql
   insert into public.cargo_admins(user_id)
   select id from auth.users where email='YOUR_ADMIN_EMAIL';
   ```
4. `.env.example` کی نقل `.env.local` کے نام سے بنائیں۔ Supabase Project Settings → API سے URL، anon/publishable key اور service_role secret key درج کریں۔ **service_role key کبھی `NEXT_PUBLIC_` مت کریں، GitHub پر `.env.local` اپ لوڈ نہ کریں۔**
5. `npm run dev`؛ پھر `http://localhost:3000` کھولیں۔ ایڈمن پینل `/login` پر ہے۔
6. ایڈمن → ویب سائٹ سیٹنگز میں اصل فون، واٹس ایپ (مثلاً 923001234567) اور پتہ درج کریں۔
7. Vercel میں repository import کریں، وہی تین Environment Variables شامل کریں، deploy کریں۔ HTTPS پر browser menu سے PWA انسٹال کریں۔

## اہم نوٹس

- عوامی بکنگ درخواست ہے؛ کرایہ اور تفصیلات دفتر سے تصدیق کے بعد ایڈمن درج کرتا ہے۔
- بلٹی کا نمبر database sequence سے خود بنتا ہے، اس لیے ایک ہی نمبر دوبارہ نہیں آتا۔
- ڈیٹا Supabase میں محفوظ ہے۔ Service role key صرف server API میں استعمال ہوتی ہے؛ login کے بعد ہر انتظامی درخواست میں Supabase user token اور cargo_admins کی جانچ ہوتی ہے۔
- PWA کا محفوظ شدہ عوامی صفحہ offline کھل سکتا ہے؛ نئی بکنگ اور ایڈمن ریکارڈ کے لیے انٹرنیٹ ضروری ہے۔
- عوامی بکنگ endpoint کے زیادہ ٹریفک والے استعمال کے لیے deploy کے بعد rate limiting یا CAPTCHA لگانا مناسب ہوگا۔

## موجودہ تنصیب کو اپ ڈیٹ کریں

Supabase SQL Editor میں `UPDATE_EXISTING_DATABASE.sql` چلائیں، پھر اسی فولڈر کی تمام تبدیل شدہ فائلیں GitHub repository کے `alrehman-cargo/` فولڈر میں اپ لوڈ کریں۔ Vercel اسی GitHub commit سے خود دوبارہ deploy کرے گا۔ پہلے `/login` کھولیں تاکہ نیا service worker فعال ہو، پھر ویب سائٹ کھولیں۔
