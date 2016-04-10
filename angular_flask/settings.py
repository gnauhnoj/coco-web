import os
import config

MONGO_URL = os.environ.get('MONGO_URL')
if not MONGO_URL:
    MONGO_URL = config.MONGO_URL
DEBUG = True
MONGO_URI = MONGO_URL
