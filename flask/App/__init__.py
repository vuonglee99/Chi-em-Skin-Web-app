from flask import Flask
from config import Config
from flask_cors import CORS
from App.userModule.userController import mod_user as user_module
from App.postModule.postController import mod_post as post_module
from App.skincareModule.skincareController import mod_skincare as skincare_module
from App.productModule.productCotroller import mod_product as product_module
from App.supportingModule.supportingController import mod_supporting as supporting_module
from flask_swagger_ui import get_swaggerui_blueprint

app=Flask(__name__)
app.config.from_object(Config)
CORS(app)
from App import main
SWAGGER_URL='/swagger'
API_URL='/static/swagger.json'
swaggerui_blueprint=get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name':"Chi-em Skin"
    }
)
app.register_blueprint(user_module)
app.register_blueprint(post_module)
app.register_blueprint(skincare_module)
app.register_blueprint(product_module)
app.register_blueprint(swaggerui_blueprint,url_prefix=SWAGGER_URL)
app.register_blueprint(supporting_module)







