def index():
    print('index')
    word = 'melon'
    if (request.args):
        print(request.args[0])
        word = 'caballo'
    
    return dict(word = word)


def graphic_test():
    return dict()

def tweet_users_table():
    grid = SQLFORM.grid(db.tweet_users_table, deletable=True)
    # grid = SQLFORM.smartgrid(db[tablename], args=[tablename], deletable=False, editable=False)
    return dict(grid = grid)


# Creado el 18 de Febrero con la nueva database
def panel():
    grid = SQLFORM.grid(db.master_case_table, deletable=True)
    # grid = SQLFORM.smartgrid(db[tablename], args=[tablename], deletable=False, editable=False)
    return dict(grid = grid)



def data_stored2():
    # form = SQLFORM(db.tabla_tweets_retweets)
    grid = SQLFORM.grid(db.data_table, deletable=True)
    # grid = SQLFORM.smartgrid(db[tablename], args=[tablename], deletable=False, editable=False)
    return dict(grid = grid)


def fake_news_panel():
    return dict()

def buscador_by_user():
    return dict()


def graphic_test_two():
    return dict()

def index_cuatro():
    return dict()

def data_stored():
    # form = SQLFORM(db.tabla_tweets_retweets)
    grid = SQLFORM.grid(db.tabla_tweets_retweets, deletable=True)
    # grid = SQLFORM.smartgrid(db[tablename], args=[tablename], deletable=False, editable=False)
    return dict(grid = grid)

def fake_news():
    links = []
    links.append(
        dict(
            header='',
            body= lambda row : 
                A('', _href=URL('default', 'index', args=[row.id]), _class='fa fa-pencil-square')
                
                # A('', _href=URL('default', 'index', args='camino'), _class='fa fa-pencil-square')
                #     if row.user_id == auth.user.id else
                # A('', _class='hidden')
        )
    )
    # form = SQLFORM(db.tabla_tweets_retweets)
    # grid = SQLFORM.grid(db.fake_news_table, deletable=True)
    query = db.fake_news_table
    # fields=[db.Products.id, db.Products.product_name,
    # db.Products.product_stock,
    # db.Products.product_sold, db.Products.product_sales_price,
    # db.Products.product_cost],      
    grid = SQLFORM.grid(
        query,
        # fields = fields,
        links=links,
        searchable=True, 
        details=False, 
        create=False, 
        deletable=True, 
        editable=False,
        csv=False,
        user_signature=True,
    )
    return dict(grid = grid)


# __________________________________________________


def jugadores():
    return dict()   

def parejas():
    return dict() 

def nueva_pareja():
    return dict()

def grupos():
    return dict()

def partidos():
    return dict() 

# @auth.requires_login()
def resultados():
    return dict() 

# ---- API (example) -----
@auth.requires_login()
def api_get_user_email():
    if not request.env.request_method == 'GET': raise HTTP(403)
    return response.json({'status':'success', 'email':auth.user.email})

# ---- Smart Grid (example) -----
@auth.requires_membership('admin') # can only be accessed by members of admin groupd
def grid():
    response.view = 'generic.html' # use a generic view
    tablename = request.args(0)
    if not tablename in db.tables: raise HTTP(403)
    grid = SQLFORM.smartgrid(db[tablename], args=[tablename], deletable=False, editable=False)
    return dict(grid=grid)

# ---- Embedded wiki (example) ----
def wiki():
    auth.wikimenu() # add the wiki to the menu
    return auth.wiki() 

# ---- Action for login/register/etc (required for auth) -----
def user():
    """
    exposes:
    http://..../[app]/default/user/login
    http://..../[app]/default/user/logout
    http://..../[app]/default/user/register
    http://..../[app]/default/user/profile
    http://..../[app]/default/user/retrieve_password
    http://..../[app]/default/user/change_password
    http://..../[app]/default/user/bulk_register
    use @auth.requires_login()
        @auth.requires_membership('group name')
        @auth.requires_permission('read','table name',record_id)
    to decorate functions that need access control
    also notice there is http://..../[app]/appadmin/manage/auth to allow administrator to manage users
    """
    return dict(form=auth())

# ---- action to server uploaded static content (required) ---
@cache.action()
def download():
    """
    allows downloading of uploaded files
    http://..../[app]/default/download/[filename]
    """
    return response.download(request, db)
