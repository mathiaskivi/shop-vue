FROM nginx:latest

# Copy over the source code
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/

# Start the application

# Heroku
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
