import os, json
import twitter
import ast

# definimos una clase, que convierte JSON en objeto
class Objeto_JSON(object):
    def __init__(self, data):
	    self.__dict__ = json.loads(data)


def get_logged_in_user():
    user = None if auth.user is None else auth.user
    return response.json(dict(user=user))

    # GET RETWEETS 
    # https://api.twitter.com/1.1/statuses/home_timeline.json
    # getRetweet

    # Usar un embellecedor
    # @requires_twitter_logged

# OWN DECORATOR


# TO-DO
# En el metodo una vex esta loggeado en twitter con las credentials, hacer un get request normal
# como en la pagina del drive (problemas & soluciones), del tio que hace
# @GET(url, q=word?&count=ffff) y ver el resultado
# (bypass teweetpy api)

# CONTROL de RATES



def requires_twitter_auth():
    print('decorator activated [Auth]')
    
    consumer_key = 'dXj0dViDbK6VobzAD5P97iCrO'
    consumer_secret = 'DwRbuw8rRgMBh6Gg9qORDXpDJ4RLp0wGq4RWj5SVw4KJT6nDZq'
    access_token = '1164482563198636033-PMEvNG9Pz1aGL3SLKw1QX9TwjStdD5'
    access_secret = '1sYd9Mp8IS6TTXaD0nzgtXguFiABf4eSjvXVPf8va05uG'

    api = twitter.Api(consumer_key = consumer_key,consumer_secret = consumer_secret
    , access_token_key = access_token, access_token_secret = access_secret)

    return api

def log_on_twitter():
    print('\nloggin on twitter')
    api = requires_twitter_auth()
    print(api.VerifyCredentials())


def post_tweet():
    print('post tweet api method')

    requires_twitter_auth()
    string =request.vars.string

    api = twitter.Api(consumer_key = consumer_key,consumer_secret = consumer_secret
    , access_token_key = access_token, access_token_secret = access_secret)

    status = api.PostUpdate(string)
    print('end method')



# Warning los retweets estan con trim_user=True, testear otras opciones
# -TODO
    # - get the number of tweets from client
    # - try catchs
def get_tweet():
    print('\n\nget tweet method')    
    # get the query for search on twitter
    word = request.vars.word

    testing = False
    if testing:
        print ('Testing')
        # Get tweets
        tweets = get_tweet_json()  
        # Get retweets
        number_of_rt = 10
        retweets = get_retweets_json()   

    else:
        api = requires_twitter_auth()            
        print ('\n\nQQQ\n')

        # Get tweets
        tweets = api.GetSearch(term=word, count=2)    
        tweets = [tweet.AsDict() for tweet in tweets]

        

        for tweet in tweets:
            tweet_json = json.dumps(tweet)
            tweet_objeto = Objeto_JSON(tweet_json)
            print tweet_objeto.id
            #get retweet
        

        # # Test
        retweets = get_retweets_json()   

        # Get retweets
        # number_of_rt = 100
        # retweets = api.GetRetweets('1166878379695431681', count=number_of_rt, trim_user=True)
        # retweets =  [retweet.AsDict() for retweet in retweets]
        
    # return results as JSON
    # Order list by ascendent date
    # retweets = retweets[::-1]
    return response.json(dict(tweets=tweets, retweets=retweets))




#           TESTING PURPOSES
# ____________________________________________________________________________________
# The next methods have been created only for testing purposes

def test_index_function():
    print('test function')


# To avoid doing all the tima calls to api
def get_retweets_json():
    path=os.path.join(request.folder,'private','retweets_long.txt')
    with open(path) as json_file:
        retweets = json.load(json_file)
    return retweets

def get_tweet_json():
    path=os.path.join(request.folder,'private','tweet.txt')
    with open(path) as json_file:
        tweet = json.load(json_file)
    return tweet


























# ____________________________________________________________________________________
# Methods for jugadores.html view
def get_jugadores():
    jugadores = db(db.jugador).select()
    return response.json(dict(jugadores=jugadores))

def change_pagado():
    jugador = db(db.jugador.id == request.vars.id).update(pagado = request.vars.pagado)

def change_regalo():
    jugador = db(db.jugador.id == request.vars.id).update(regalo = request.vars.regalo)
# ____________________________________________________________________________________


# Methods for parejas.html
# ____________________________________________________________________________________
def get_parejas():
    parejas = db().select(db.pareja.ALL, orderby=db.pareja.grupo)
    for p in parejas:
        jugador_uno = db(db.jugador.id == p.jugador_uno).select().first()
        jugador_dos = db(db.jugador.id == p.jugador_dos).select().first()
        p.nombre_jugador_uno = jugador_uno.nombre
        p.restricciones_jugador_uno = jugador_uno.restricciones     
        p.nombre_jugador_dos = jugador_dos.nombre
        p.restricciones_jugador_dos = jugador_dos.restricciones      
    return response.json(dict(parejas=parejas))

def update_pareja():
    pareja = db.pareja.update_or_insert(db.pareja.id == request.vars.id,
    grupo = request.vars.grupo
    )
    db.jugador.update_or_insert(db.jugador.id == request.vars.jugador_uno,
    nombre= request.vars.nombre_jugador_uno,
    restricciones = request.vars.restricciones_jugador_uno
    )
    db.jugador.update_or_insert(db.jugador.id == request.vars.jugador_dos,
    nombre= request.vars.nombre_jugador_dos,
    restricciones = request.vars.restricciones_jugador_dos
    )

def delete_pareja():
    id = request.vars.id
    db(db.pareja.id == request.vars.id).delete()
    db(db.jugador.id == request.vars.jugador_uno).delete()    
    db(db.jugador.id == request.vars.jugador_dos).delete()

# ____________________________________________________________________________________


# ____________________________________________________________________________________
# Methods for nueva_pareja.html view
def save_pareja():
        jug_uno = db.jugador.insert(
            nombre=request.vars.jugador_uno,
            restricciones = request.vars.restricciones_uno  
        )
        jug_dos = request.vars.jugador_dos
        if (jug_dos == ''):
            jug_dos = 'Por determinar'
        jug_dos = db.jugador.insert(
            nombre = jug_dos,
            restricciones = request.vars.restricciones_dos
            )
        grupo = request.vars.grupo
        if (grupo == ''):
            grupo = 0
        pareja = db.pareja.insert(
            jugador_uno=jug_uno,
            jugador_dos=jug_dos,
            grupo = grupo
        )
        # print('pareja saved')

        # return redirect(URL('default', 'jugadores'))

        # print(jug_uno, jug_dos, grupo)
        if (jug_uno and jug_dos and pareja):
            return True
        else:
            return False
# ____________________________________________________________________________________


# ____________________________________________________________________________________
# For grupos.html view
def get_grupos():
    lista = []
    counter = 1 
    max_group = 0

    parejas_sin_grupo = db(db.pareja.grupo == 0).select()
    for p in parejas_sin_grupo:
        p.nombre_jugador_uno = db(db.jugador.id == p.jugador_uno).select().first().nombre                
        p.nombre_jugador_dos = db(db.jugador.id == p.jugador_dos).select().first().nombre
        

    while (counter < 20):
        parejas = db(db.pareja.grupo == counter).select()
        if (parejas):
            for p in parejas:
                p.nombre_jugador_uno = db(db.jugador.id == p.jugador_uno).select().first().nombre                
                p.nombre_jugador_dos = db(db.jugador.id == p.jugador_dos).select().first().nombre
            crear_enfrentamientos(parejas)
            lista.append(parejas)
            counter+=1
        else:
            counter+=1
    max_group = counter - 1
    return response.json(dict(parejas = lista, max_group = max_group, parejas_sin_grupo = parejas_sin_grupo))

def update_group_for_pareja():
    id_pareja = request.vars.index
    pareja = db.pareja.update_or_insert(db.pareja.id == id_pareja,
    grupo = request.vars.grupo
    )    

    db(db.enfrentamiento).delete()
    # pareja.nombre_jugador_uno = 'make' # db(db.jugador.id == p.jugador_uno).select().first().nombre                
    # pareja.nombre_jugador_dos = 'lele' #db(db.jugador.id == p.jugador_dos).select().first().nombre


# ____________________________________________________________________________________
# Methods for partidos.html view
def crear_enfrentamientos(parejas):
    for i in range(len(parejas)):
        for j in range(i+1, len(parejas)):
            # print("enfrentamiento: ", parejas[i].id , " VS ", parejas[j].id )
            db.enfrentamiento.update_or_insert(grupo = parejas[i].grupo, pareja_uno=parejas[i].id, pareja_dos=parejas[j].id)
        

def save_result():
    stored = db.enfrentamiento.update_or_insert(
        db.enfrentamiento.id == request.vars.index,
        resultado_uno = request.vars.result_one,
        resultado_dos = request.vars.result_two 
    )
# ____________________________________________________________________________________
    
    
def get_partidos():
    # retrieveing jugadores from DB for display the names in the view
    jugadores = db(db.jugador).select()
    parejas = db(db.pareja).select()

    lista = []
    counter = 1 
    max_group = 0
    # "problema cuando no falta un grupo"
    while (counter < 20):
        enfrentamiento = db(db.enfrentamiento.grupo == counter).select()
        # print (parejas)
        if (enfrentamiento):
            for e in enfrentamiento:
                # De cada enfrentamiento, extraer pareja uno y dos
                p1_id = parejas.find(lambda pareja: pareja.id == e.pareja_uno)            
                p2_id = parejas.find(lambda pareja: pareja.id == e.pareja_dos)
                # De cada pareja, extraer los nombres uno y dos
                nombres_pareja_uno = jugadores.find(lambda jugador: jugador.id == p1_id[0].jugador_uno)[0].nombre + ' & ' + jugadores.find(lambda jugador: jugador.id == p1_id[0].jugador_dos)[0].nombre
                nombres_pareja_dos = jugadores.find(lambda jugador: jugador.id == p2_id[0].jugador_uno)[0].nombre + ' & ' + jugadores.find(lambda jugador: jugador.id == p2_id[0].jugador_dos)[0].nombre
                # print(nombres_pareja_)
                e.nombres_pareja_uno = nombres_pareja_uno
                e.nombres_pareja_dos = nombres_pareja_dos
            lista.append(enfrentamiento)
            counter+=1
        else:
            counter+=1
    max_group = counter - 1
    return response.json(dict(enfrentamiento = lista, max_group = max_group))


# Methdos for resultados.html view
# ____________________________________________________________________________________

def get_results():
    # Partidos ganados, perdidos, JF jC Dif juegos, Posicion
    # print('\n\nGET RESULTS')
    lista_enfrentamientos = []
    lista_parejas = []
    counter = 1 
    max_group = 0
    # "problema cuando no falta un grupo"
    while (counter < 20):
        enfrentamientos = db(db.enfrentamiento.grupo == counter).select()        
        parejas = db(db.pareja.grupo == counter).select()
        for p in parejas:
            p.nombre_jugador_uno = db(db.jugador.id == p.jugador_uno).select().first().nombre                
            p.nombre_jugador_dos = db(db.jugador.id == p.jugador_dos).select().first().nombre
        # print (parejas)
        if (enfrentamientos):
            lista_enfrentamientos.append(enfrentamientos)
            lista_parejas.append(parejas)
            counter+=1
        else:
            counter+=1
    max_group = counter - 1
    return response.json(dict(enfrentamientos = lista_enfrentamientos, parejas = lista_parejas, max_group = max_group))

# def delete():    
    # db(db.pareja.grupo == None).delete()
