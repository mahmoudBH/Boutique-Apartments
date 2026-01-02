# Stage 1: Build
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine
# حذف الإعدادات الافتراضية تماماً
RUN rm /etc/nginx/conf.d/default.conf
# حذف الملفات الافتراضية لـ Nginx
RUN rm -rf /usr/share/nginx/html/*

# نسخ ملف الإعداد الخاص بنا
COPY nginx.conf /etc/nginx/conf.d/default.conf
# نسخ الملفات المبنية إلى المسار الصحيح
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]