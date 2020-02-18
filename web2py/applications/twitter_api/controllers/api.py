import os, json
import twitter
import ast


# Salva a tres gatitos de morir congelados con ayuda de una taza de café - https://t.co/n1Qz4J8g0Z https://t.co/57iA2iVRbR
# https://es.rt.com/7b5b esta url y esta llevan a la misma pag https://t.co/n1Qz4J8g0Z

# El parlamento europeo obliga a retirar reconocimiento


# ____________________________ RETRIEVE DATA TO JSON _________________________________________

# tweets_timeline = api.GetUserTimeline(screen_name =user_to_search)
# data = [tweet.AsDict() for tweet in tweets_timeline]
# return response.json(dict(data = data))
# ____________________________________________________________________________________________



# 1229346187301576705
# 1229210391961591808
# 1227621525613957120
# 1229910684164476928
# 1229910623561146370
# 1229910599724748800
# 1229910450990612483
# 1229910412000399360
# 1229910395185442816
# 1229910355264102403
# 1229910231989334018
# 1229910128226267137
# 1229910016569888770
# 1229909914258223105
# 1229909897405509632
# 1229909869744021504
# 1229909791688007680
# 1229909789758705664
# 1229909705033764864
# 1229909698947768320


def test_function_from_index():
    print ("TESTING FUNCTION FROM INDEX")

    api = requires_twitter_auth()   
    print ('\n\nUUU\n')

    count = 20

    # Api method to search the user. It is valid either by user Id or by @Twitter_shortname
    tweets_timeline = api.GetUserTimeline(screen_name = "malditobulo", count = count)
    data = [tweet.AsDict() for tweet in tweets_timeline]



    for tweet in data:
        tweet_json = json.dumps(tweet)
        tweet_objeto = Objeto_JSON(tweet_json)
        print (tweet_objeto.id)

        # get retweets
        number_of_rt = 5
        status = api.GetStatus(tweet_objeto.id) 
        print(status.full_text)
        # retweets = api.GetRetweets(tweet_objeto.id, count=number_of_rt, trim_user=False)
        # retweets =  [retweet.AsDict() for retweet in retweets]    

    #     # variable = db.data_table.update_or_insert(
    #     #     stored_data = json.dumps(tweet),
    #     #     retweets = json.dumps(retweets)
    #     # )




# DEPRECATED!!!!!
def add_to_database2():
    api = requires_twitter_auth()            
    print ('\n\nUUU\n')

    # Get tweets
    tweets = api.GetSearch(term="taza", count=1)
    tweets = [tweet.AsDict() for tweet in tweets]

    for tweet in tweets:
        tweet_json = json.dumps(tweet)
        tweet_objeto = Objeto_JSON(tweet_json)
        id = tweet_objeto.id
        print (tweet_objeto.id)
        # print(type(tweet_objeto.id))

        # get retweets
        number_of_rt = 5
        x = 1229346187301576705
        print("x")
        print(type(x))
        print(x)
        print("id")
        print(type(tweet_objeto.id))
        print(tweet_objeto.id)
        print("\n\n")
        retweets = api.GetRetweets(id, count=number_of_rt, trim_user=False)
        retweets =  [retweet.AsDict() for retweet in retweets]    

        variable = db.data_table.update_or_insert(
            stored_data = json.dumps(tweet),
            retweets = json.dumps(retweets)
        )




# ____________________________ STORING ON THE DB _______________________________________

# method created 18-Feb-2020
def add_to_database():
    api = requires_twitter_auth()     
    print("add to db method") 
    
    #retrieveing the tweet in json string
    tweet_json = request.vars.tweet
    # Convert to python object
    tweet_objeto = Objeto_JSON(tweet_json)
    tweet = tweet_objeto #to work with

    title = tweet.full_text
    urls = tweet.urls
    
    number_of_rt = 5
    id = int(request.vars.id)


    print(id)
    print(type(id))
    if (id == 1229855923767775232):
        print("IGUALES!")
    status = api.GetStatus(id)

    # tweets = api.GetSearch(term=tweet.full_text, count=1)
    # results = [tweet.AsDict() for tweet in tweets]
    # tweet = tweets.get

    # tweet_json = json.dumps(results)
    # tweet_objeto = Objeto_JSON(tweet_json)

    # print("/nRetrieved tweet/n")
    # print(tweet_objeto)
    # for tweet in tweets:
    #     tweet_json = json.dumps(tweet)
    #     tweet_objeto = Objeto_JSON(tweet_json)
    #     id = tweet_objeto.id




    # print (tweet.id)
    # print(type(tweet.id))
    # # tweet.id = 1229346187301576705
    # tweet.id = 1229855923767775200

    # ____ 
    # x = 1229346187301576705
    # print("x")
    # print(type(x))
    # print(".",x,".")
    # print("id")
    # print(type(id))
    # print(".",id,".")
    # print("\n\n")
    # # id = x
    
    # api = requires_twitter_auth()
    # retweets = api.GetRetweets(tweet.id, count=number_of_rt, trim_user=False)
    # retweets =  [retweet.AsDict() for retweet in retweets]  


    # _____



    # # Get the user to object to work with 
    # user_string = json.dumps(tweet.user)
    # user_objeto = Objeto_JSON(user_string)
    # user_name = user_objeto.name
    # print (user_name)

    # stored_user = db.tweet_users_table.update_or_insert(db.tweet_users_table.name == user_name,
    #     name = user_name,
    #     user_data = user_string
    # )

    # # other_tweets = api.GetSearch()
    # tweet_id = tweet.id

    # variable = db.master_case_table.update_or_insert(db.master_case_table.tweet_id == tweet_id,
    #     title = tweet.full_text,
    #     utls = tweet.urls,
    #     tweet_id = tweet.id,
    #     tweet_user = stored_user,
    #     tweet = tweet_json
    #     # retweets = json.dumps(retweets)
    # )
# ____________________________________________________________________________________



# DEPRECATED!!!!!
def store_data():
    api = requires_twitter_auth()            
    print ('\n\nUUU\n')

    # Get tweets
    tweets = api.GetSearch(term="taza", count=1)
    tweets = [tweet.AsDict() for tweet in tweets]

    for tweet in tweets:
        tweet_json = json.dumps(tweet)
        tweet_objeto = Objeto_JSON(tweet_json)
        print (tweet_objeto.id)

        # get retweets
        number_of_rt = 50
        retweets = api.GetRetweets(tweet_objeto.id, count=number_of_rt, trim_user=False)
        retweets =  [retweet.AsDict() for retweet in retweets]    

        variable = db.data_table.update_or_insert(
            stored_data = json.dumps(tweet),
            retweets = json.dumps(retweets)
        )




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

# ___________________________ SEARCH BY USER ____________________________________

def search_by_user():
        
    api = requires_twitter_auth()      
    user_to_search =  request.vars.user_to_search
    # user_to_search = ""

    # Number of retweets to retrieve
    count = 10

    # Api method to search the user. It is valid either by user Id or by @Twitter_shortname
    tweets_timeline = api.GetUserTimeline(screen_name = user_to_search, count = count)
    data = [tweet.AsDict() for tweet in tweets_timeline]
    

    return response.json(dict(data = data))


# def get_similar_tweets():
#     url = "salva"

#     api = requires_twitter_auth()     
#     results = api.GetSearch(url, count = 5)
#     print("UKI")
#     print(results) 


# _______________________________________________________________________________



# CONTROL de RATES



def requires_twitter_auth():
    print('decorator activated [Auth]')
    
    consumer_key = 'dXj0dViDbK6VobzAD5P97iCrO'
    consumer_secret = 'DwRbuw8rRgMBh6Gg9qORDXpDJ4RLp0wGq4RWj5SVw4KJT6nDZq'
    access_token = '1164482563198636033-PMEvNG9Pz1aGL3SLKw1QX9TwjStdD5'
    access_secret = '1sYd9Mp8IS6TTXaD0nzgtXguFiABf4eSjvXVPf8va05uG'

    api = twitter.Api(consumer_key = consumer_key,consumer_secret = consumer_secret
    , access_token_key = access_token, access_token_secret = access_secret, sleep_on_rate_limit=True, tweet_mode ="extended")

    # from pprint import pprint
    # pprint(vars(api))

    # print ('\n\nPrinting rate limits objetc inside api')
    # rate_limit = api.rate_limit    
    # pprint(vars(rate_limit))

    
    # print ('\n\nPrinting rate limits per se')
    # pprint(vars(twitter.ratelimit.RateLimit()))
    print("AUTH PROCESS ACTIVATED")

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



# tweets = api.GetSearch(term=word, count=1)    
# tweets = [tweet.AsDict() for tweet in tweets]

# for tweet in tweets:
#     tweet_json = json.dumps(tweet)
#     tweet_objeto = Objeto_JSON(tweet_json)
#     print (tweet_objeto.id)



def get_data():

    # Test function to store data
    # store_data()
    # return

    testing = True
    data = []

    if testing:
        data = db(db.data_table).select().first()
        # print(db(db.data_table.id == 0).select().first())
    print("data access2")
    print(data)
    return response.json(dict(data = data))


# Warning los retweets estan con trim_user=True, testear otras opciones
# -TODO
    # - get the number of tweets from client
    # - try catchs
def get_tweet():
    print('\n\nget tweet method')    
    # get the query for search on twitter
    word = request.vars.word
    test_mode = request.vars.test_mode

    # Since False != false (JS VS Python)
    testing = False
    if test_mode == 'false':
        testing = False
        
    print(testing)

    if testing:
        # api = requires_twitter_auth()  
        print ('Testing')
        # tweets = get_tweet_json()  
        # retweets = get_retweets_json()
        list_tweets_and_retweets = get_list_tweets_and_retweets_json()
        # To avoid erros, intialize the lsits to return as request.vars
        tweets = []
        retweets = []
        retweets_two = []
        # list_tweets_and_retweets = db(db.list_tweets_retweets.id == 0).select().first()
        # list_tweets_and_retweets = json.dumps(list_tweets_and_retweets)
        # p.nombre_jugador_uno = db(db.jugador.id == p.jugador_uno).select().first().nombre  


    else:
        api = requires_twitter_auth()            
        print ('\n\nUUU\n')

        # Get tweets
        tweets = api.GetSearch(term=word, count=5)    
        tweets = [tweet.AsDict() for tweet in tweets]

        # list of couples [(tweet1, retweeets1), (tweet2, retweeets2), (...)]
        list_tweets_and_retweets = []

        for tweet in tweets:
            tweet_json = json.dumps(tweet)
            tweet_objeto = Objeto_JSON(tweet_json)
            print (tweet_objeto.id)
            
            # Get retweets
            number_of_rt = 50
            retweets = api.GetRetweets(tweet_objeto.id, count=number_of_rt, trim_user=False)

            retweets =  [retweet.AsDict() for retweet in retweets]
            
            # Adding everything in a big list to return as request vars
            list_tweets_and_retweets.append([tweet, retweets])

            # CreateFriendship(self, user_id=None, screen_name=None, follow=True, retweets=True, **kwargs)
            # print(CreateFriendship(self, user_id=None, screen_name=None, follow=True, retweets=True, **kwargs))



        # # Test
        retweets_two = get_retweets_json()
        datos = json.dumps(list_tweets_and_retweets)

        # Store data on the database
        variable = db.tabla_tweets_retweets.update_or_insert(
            stored_data = json.dumps(list_tweets_and_retweets)
        )

        twitter_api = ''

        # print (variable)
        # pareja = db.pareja.update_or_insert(db.pareja.id == request.vars.id,
        # grupo = request.vars.grupo
        # )
        
        # Saved in saved.txt
        # path=os.path.join(request.folder,'private','saved.txt')
        # # fullStr = ' '.join(list_tweets_and_retweets)
        # fullStr = json.dumps(list_tweets_and_retweets)
        # f = open(path, "a")
        # f.write(fullStr)
        # f.close()
        
    # return results as JSON
    # Order list by ascendent date
    # retweets = retweets[::-1]
    return response.json(dict(tweets=tweets, retweets=retweets_two, list_tweets_and_retweets = list_tweets_and_retweets))


# Store data on the database
def save_data():
    # Retrieve the data and prepare the variables
    stored_data = request.vars.stored_data
    error = None

    if ((stored_data is None) or (stored_data == '')):
        error = 'Data to store was empty, nothing stored'
        return response.json(dict(result = False, error = error))

    # Storing data
    variable = db.tabla_tweets_retweets.insert(
        stored_data = stored_data
    )

    # Return True if data is stored correctly
    if (variable is None):
        error = 'Error when storing data'
        return response.json(dict(result = False, error = error))

    return response.json(dict(result = True, error = error))


def mark_as_fake():
    print('marked as fake')    
    stored_data = request.vars.stored_data
    topic = request.vars.topic
    search_line = request.vars.search_line

    if ((stored_data is None) or (stored_data == '')):
        error = 'Data to store was empty, nothing stored'
        return response.json(dict(result = False, error = error))

    # Storing data
    variable = db.fake_news_table.insert(
        stored_data = stored_data,
        search_line = search_line
    )

    # Return True if data is stored correctly
    if (variable is None):
        error = 'Error when storing data'
        return response.json(dict(result = False, error = error))

    return response.json(dict(result = True, error = None))

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

def get_list_tweets_and_retweets_json():
    path=os.path.join(request.folder,'private','saved.txt')
    with open(path) as json_file:
        list_tweets_and_retweets = json.load(json_file)
    return list_tweets_and_retweets

























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
