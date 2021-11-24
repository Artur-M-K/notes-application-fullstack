release: python manage.py migrate
web: gunicorn notes.wsgi --log-file -
heroku config:set SECRET_KEY=yoursecretkey