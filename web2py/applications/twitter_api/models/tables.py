import datetime

def get_user_email():
    return None if auth.user is None else auth.user.email

def get_user_full_name():
    return None if auth.user is None else auth.user.first_name + ' ' + auth.user.last_name


db.define_table('tabla_tweets_retweets',
    Field('stored_data', 'text')
)


db.define_table('jugador',
    Field('nombre', requires=IS_NOT_EMPTY()),
    Field('pagado', 'boolean', default=False),
    Field('regalo', 'boolean', default=False),    
    Field('restricciones', 'string', default = '')

)

db.define_table('pareja',
    Field('grupo', default=0),
    Field('jugador_uno', 'reference jugador'),
    Field('jugador_dos', 'reference jugador')
)

db.define_table('enfrentamiento',
    # Field('numbero', type='id'),
    Field('grupo', 'integer', default=0),
    Field('pareja_uno', 'reference pareja'), # Reference jugador    
    Field('resultado_uno', 'integer', default=0),
    Field('pareja_dos', 'reference pareja'),
    Field('resultado_dos', 'integer', default=0)
)

 # prescindible grupos
# db.define_table('grupo',
#     Field('numero', type='id'),
#     Field('pareja', 'reference pareja')
# )

db.define_table('movie',
    Field('movie_title', label='Title'),
    Field('movie_description', 'text', label='Description'),
    Field('movie_image', 'upload', label='Image'),
    Field('movie_creator', default=get_user_email(), readable=False, writable=False)
)

db.movie.id.readable = db.movie.id.writable = False
db.movie.movie_image.represent = lambda v, r : \
        IMG(_src=URL('default', 'download', args=r.movie_image), _width="50")

db.define_table('reviewer_profile',
    Field('user_email', default=get_user_email(), readable=False, writable=False),
    Field('user_name', label='Name', default=get_user_full_name()),
    Field('favorite_food', label='Favorite Food', default='Banana'),
    Field('favorite_movie', label='Favorite Movie')
)

db.reviewer_profile.id.readable = db.reviewer_profile.id.writable = False
db.reviewer_profile.favorite_movie.requires = IS_EQUAL_TO('Shrek', error_message='No. Your favorite movie is Shrek.')

db.define_table('movie_review',
    Field('reviewer_email'),
    Field('movie_id', 'reference movie', readable=False, writable=False),
    Field('movie_title', label='Title'),
    Field('movie_review_body', 'text', label='Body'),
    Field('number_rating', 'integer', default=1)
)

db.movie_review.id.readable = db.movie_review.id.writable = False