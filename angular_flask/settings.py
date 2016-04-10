import os

MONGO_URL = os.environ.get('MONGOLAB_URI')
if not MONGO_URL:
    import config
    MONGO_URL = config.MONGO_URL
DEBUG = True
MONGO_URI = MONGO_URL
