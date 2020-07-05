import os, json
import twitter
import ast

# For parsing the url and retrieveing the page title of a new
import urllib.request
from bs4 import BeautifulSoup

import botometer
# number_of_retweets_to_retrieve

# Check general comments at the end

import asyncio
import datetime
import time

def get_time():
  currentDT = datetime.datetime.now()
  print (str(currentDT))




def test_function_from_index():
    print ("TESTING FUNCTION FROM INDEX")

    # api = requires_twitter_auth()   
    print ('\n\nUUU\n')

    # tweet_id = "1232408046564970496"
    # variable = db.master_case_table(db.master_case_table.tweet_id == tweet_id).select().first()
    # ret = variable.retweets


    
# def update_all(): 
#     # Por cada elemento guardado

#     # results_retrieved = db(db.stored_tweets).select()
#     results_retrieved = db(db.master_case_table).select()
#     list_ids_of_master_table = []

#     for result in results_retrieved:
#         list_ids_of_master_table.append(result.id)

    
    
    
#     print(list_ids_of_master_table)

#     for id in list_ids_of_master_table:   
#         try:
#             print("updating: "+ str(id))
#             update_retweets(str(id))
#         except:
#             print("error on update: " + str(id))
#         time.sleep(60*3) 

    # print('test function')




def test_function(): 
    update_tracking_groups()




def update_tracking_groups():
    print("\n\nupdate_tracking_groups")

    groups_on_tracking = db(db.group_tweets.tracking == True).select()
    has_updates = False
    new_retweets = []
    

    for group in groups_on_tracking:
        has_updates = False
        print("updating" + str(group.main_id))
        id_main_tweet = db(db.master_case_table.id == group.main_id).select().first().tweet_id
        new_retweets = update_retweets(str(id_main_tweet))
        print(new_retweets)
        if (new_retweets is not None):
            has_updates = True

        for id_tweet_master in group.ids:
            print("updating " + str(id_tweet_master))
            id = db(db.master_case_table.id == id_tweet_master).select().first().tweet_id
            new_retweets = update_retweets(str(id))
            if (new_retweets is not None):
                has_updates = True
        if (has_updates):
            print("hay nuevso ret?")
            print (has_updates)
            print(group.id)
            db.group_tweets.update_or_insert(db.group_tweets.id == group.id,
                has_updates = True
            )
        else:
            print("not ipdates")

        # five minutes sleep for avoid API limits
        # time.sleep(60*5) 




# ____________________________ METODO DE AUTENTICACION _______________________________________

def requires_twitter_auth():
    # print('decorator activated [Auth]')
    print("AUTH PROCESS ACTIVATED")
    
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

    return api




def auth_botometer():
  consumer_key = 'dXj0dViDbK6VobzAD5P97iCrO'
  consumer_secret = 'DwRbuw8rRgMBh6Gg9qORDXpDJ4RLp0wGq4RWj5SVw4KJT6nDZq'
  access_token = '1164482563198636033-PMEvNG9Pz1aGL3SLKw1QX9TwjStdD5'
  access_secret = '1sYd9Mp8IS6TTXaD0nzgtXguFiABf4eSjvXVPf8va05uG'

  rapidapi_key = "a13030e496msh6b649e50ee08de9p15e359jsn11fd17f68109" # now it's called rapidapi key
  twitter_app_auth = {
      'consumer_key': consumer_key,
      'consumer_secret': consumer_secret,
      'access_token': access_token,
      'access_token_secret': access_secret,
    }
  bom = botometer.Botometer(wait_on_ratelimit=False,
                            rapidapi_key=rapidapi_key,
                            **twitter_app_auth)
  return bom


def aux_fun(account):
    has_error = 0
    error_message = ''
    result_score = ''
    bom = auth_botometer()
    # result = None

    try:
      result = bom.check_account(account)
      print(result)
      result_score = result['scores']['universal']
    except:
      print('Error on botometer api')
      # print(result['error'])
      has_error = 1
      error_message = 'Error on botometer api'
      result_score = -1
    # else:

    
    return dict(result_score=result_score, has_error=has_error, error_message=error_message)


def check_bot():
    print('API - check - bot')
    account = request.vars.user_to_search
    print(account)

    bom = auth_botometer()
    result = bom.check_account(account)
 
    return response.json(dict(result=result))
    # try:
    #   print(result)
    #   result_score = result['scores']['universal']
    # except:
    #   print('Error on botometer api')
    #   # print(result['error'])
    #   has_error = 1
    #   error_message = 'Error on botometer api'
    #   result_score = -1
    # else:

    
    # return dict(result_score=result_score, has_error=has_error, error_message=error_message)



# definimos una clase, que convierte JSON en objeto
class Objeto_JSON(object):
    def __init__(self, data):
	    self.__dict__ = json.loads(data)


# Usar un embellecedor
# @requires_twitter_logged
def get_logged_in_user():
    user = None if auth.user is None else auth.user
    return response.json(dict(user=user))



# ___________________________ SEARCH BY USER ____________________________________


def search_by_user():
        
    api = requires_twitter_auth()      
    user_to_search =  request.vars.user_to_search
    # user_to_search = ""

    # Number of retweets to retrieve
    count = 20

    # Api method to search the user. It is valid either by user Id or by @Twitter_shortname
    tweets_timeline = api.GetUserTimeline(screen_name = user_to_search, count = count)
    data = [tweet.AsDict() for tweet in tweets_timeline]
    

    return response.json(dict(data = data))




# ____________________________ STORING ON THE DB _______________________________________

# Method created 18-Feb-2020, updated 07-Abr-2020
# Working properly
def add_to_database():
    """
        Metodo (EXTERNO CLIENTE) llamado desde buscador_by_user recibe un tweet y lo almacena la base de datos
        Input: tweet (a traves del Get Request)
        Output: -
    """
    print("\n\nAPI method - Add to DATABASE") 

    # authentication
    api = requires_twitter_auth()     
    
    #retrieveing the tweet from the client POST in json string
    tweet_json = request.vars.tweet
    # Convert to python object
    tweet = Objeto_JSON(tweet_json)

    # tweet = tweet_objeto #to work with

    # Get the data from the tweet
    title = tweet.full_text
    urls = tweet.urls
    # The valid ID is the tweet.id_string in Integer format
    # id = int(tweet.id_str)
    id = tweet.id_str

    # status = api.GetStatus(int(tweet.id_str))
    
    # Get all the retweets
    retweets = get_retweets(id)

    # Get the user to object to work with 
    user_string = json.dumps(tweet.user)
    user_objeto = Objeto_JSON(user_string)
    user_name = user_objeto.screen_name
    print (user_name)


    # Guardamos el usuario en una tabla de usuarios (on tracking)
    print("PRE")
    stored_user = db.tweet_users_table.update_or_insert(db.tweet_users_table.name == user_name,
        name = user_name,
        user_data = user_string
    )

    print("stored user")
    print(stored_user)

    variable = db.master_case_table.update_or_insert(db.master_case_table.tweet_id == id,
        title = tweet.full_text,
        user_name = user_name,
        utls = tweet.urls,
        tweet_id = id,
        tweet_user = stored_user,
        tweet = tweet_json,
        retweets = json.dumps(retweets)
    )


    
    saved = db.stored_tweets.update_or_insert(db.stored_tweets.tweet_id == variable,
        tweet_id = variable
    )

    # Redirect not working
    # return redirect(URL('default', 'fake_news_panel'))



def get_retweets(id_tweet):    
    print("API Get Retweets")
    
    number_of_retweets_to_retrieve = 50

    # Recuperamos los retweets de la base de datos
    data = db(db.master_case_table.tweet_id == id_tweet).select().first()
    if (data):
        retweets = data.retweets # str
        list_stored_retweets = json.loads(retweets) # list
        # print(retweets_list[0]['user']['screen_name'])
    else:
        # Si no hay data, creamos una lista vacia
        list_stored_retweets = []

    print("lista recuperada - in get retweets")
    # print(list_stored_retweets)

    # Recuperamos nuevos retweets
    try:
        api = requires_twitter_auth()     
        retweets_retrieved = api.GetRetweets(id_tweet, count=number_of_retweets_to_retrieve)
        new_retweets_list =  [retweet.AsDict() for retweet in retweets_retrieved]  

        print("number of retweets retrieved: " + str(len(new_retweets_list)))
    except:
        print("ERROR - API Get Retweets no realizado con exito")
        return
    
    
    # Comparamos los antiguos y los nuevos, y creamos una lista sin duplicados
 
    # Lista de ids para comparar
    list_id_stored_retweets = []
    list_final_retweets = []

    # Guardamos en la lista final todos los que ya existian  
    for i in list_stored_retweets:
        list_final_retweets.append(i)
        list_id_stored_retweets.append(i['id_str'])
        # print(i['id_str'])

    # De los nuevos retweets, guardamos solo los que no existian
    for i in new_retweets_list:
        if (i['id_str'] not in list_id_stored_retweets):
            list_final_retweets.append(i)
            print("new reetweet retrieved")
        else:
            print("Repetido: " + i['id_str'])
    return list_final_retweets



# Actualizado a dia 7-abril
# ON review, cambiado ahora bebe de otro (para evitar guardar los tweets)
def update_retweets(id_tweet):
    """
        Este metodo (INTERNO API) recibe un id de un tweet, y realiza:
            1. Recupera los retweets almacenados relacionados con ese id
            2. Usa la API de Twitter para traer nuevos retweets
            3. Actualiza la base de datos con todos los retweets (nuevos y antiguos)
        Input: Id de la master_case_table relacianada con un tweet
        Output: lista con todos los retweets de ese tweet
    """
    print("API - update_retweets, updating retweets of: " + id_tweet)

    list_final_retweets = get_retweets(id_tweet)

    # Hacemos UPDATE de la base de datos
    db.master_case_table.update_or_insert(db.master_case_table.tweet_id == str(id_tweet),
        retweets = json.dumps(list_final_retweets)
    )
      
    return list_final_retweets





# ____________________________ FAKE NEWS PANEL _______________________________________

def start_tracking():
    print("\n\nAPI - start tracking")
    main_id = str(request.vars.tweet_id)

    # Recuperamos el tweet de la base de datos
    id_str = db(db.master_case_table.tweet_id == main_id).select().first().id

    # hacemos update del atributo tracking
    try:
        stored_element = db.group_tweets.update_or_insert(db.group_tweets.main_id == id_str,
            tracking = True,
        )
        return response.json(dict(success=True))
    except:
        return response.json(dict(success=False))



def alert_sources():
    print("\n\nAPI - alert sources")
    # print(request.vars)
    tweet_id = request.vars.tweet_id
    text_response =  request.vars.text_response
    username =  request.vars.username

    # Recuperamos el tweet de la base de datos
    stored_element = db.tracking_table.update_or_insert(db.tracking_table.tweet_id == tweet_id,
        tweet_id = tweet_id,
        text_response = text_response,
        # date = today()
    )

    # Recuperamos el tweet y los retweets
    tweet = db(db.master_case_table.tweet_id == tweet_id).select().first()
    retweets = tweet.retweets
    # try catch


    # METODO ALERTA SOURCE ___________
    # https://python-twitter.readthedocs.io/en/latest/_modules/twitter/api.html#Api.PostDirectMessage
    print("\nAlerting the Source")
    send_alert_to_source(tweet_id, text_response)
    alerted_tweet = db.alerted_tweets.update_or_insert(db.alerted_tweets.tweet_id == tweet_id,
        tweet_id = tweet_id
    )
    
    # # METODO ALERTA RETWEETS
    # **** POR IMPLEMENTAR ***


# DESACTIVADO TEMPORALMENTE
def send_alert_to_source(tweet_id, text_response):    

    print("Alerting source " + tweet_id)
    # Funsiona perfe

    tweet_id = str(tweet_id)
    print("responding " + text_response)
    api = requires_twitter_auth()      
    # result = api.PostUpdate(status = text_response, in_reply_to_status_id = tweet_id)


# Actualizado a dia 7-abril
# try catchs y control de errores
def refresh_retweets():
    """
        Este metodo (EXTERNO CLIENTE) llamado desde el cliente recibe como parametro un id de un tweet y llama al metodo update_retweets para actualizar la lista de retweets del mismo, devolviendo esa lista al cliente
        Input: Id de un tweet
        Output: lista con todos los retweets de ese tweet
    """
    print("\n\nAPI method - Refresh_retweets")

    tweet_id = str(request.vars.id)
    # Llamada al metodo update_retweets para actualizar los tweets

    print("refreshing")
    print(request.vars.id)


    list_ids = json.loads(request.vars.list_ids)
    retweets_list = []
    for id in list_ids:
        retweets_list.append(update_retweets(tweet_id))


    # retweets_list = update_retweets(tweet_id)

    return response.json(dict(retweets_list=retweets_list))


# Updated 07-Abr-2020, 
# Working, pero podria mejorarse (ver warning)
def get_data():
    """
        Este metodo (EXTERNAL CLIENTE) llamado desde fake news panel, devuelve toda la data relativa a un id de tabla master 
        Warning! (No es el id del tweet!)
    """
    # Get the Params
    # Row number coincide siempre con el ID de la tabla master, de la que se quiere recuperar el tweet concreto
    row_number = int(request.vars.id)
    origin = request.vars.origin

    print(request.vars)
    data = []
    list_agregated_tweets = []
    group_id = -1

    if (origin == "groups"):
        group_data = db(db.group_tweets.id == row_number).select().first()
        group_id = group_data.id
        main_id = group_data.main_id
        tweet_ids = group_data.ids
        print(tweet_ids)
        list_agregated_tweets = []
        for id in tweet_ids:
            print(id)
            tweet_retrieved = db(db.master_case_table.id == id).select().first()
            list_agregated_tweets.append(tweet_retrieved)

        main_tweet = db(db.master_case_table.id == main_id).select().first()
    else:
        # (origin != "groups"):
        # Get data from database
        main_tweet = db(db.master_case_table.id == row_number).select().first()

    # print(data)
    # main_complete_tweet = dict(main_tweet = data, main_reteets = data.retweets)


    #     dict_list = []
    # for (item in list_agregated_tweets):
    #     new_dict = {}
    #     dict_list.append()

    return response.json(dict(main_tweet = main_tweet, list_agregated_tweets=list_agregated_tweets, group_id=group_id))




def group_btn():
    print("\n\nAPI method - Group btn")
    # print(request.vars)
    name = request.vars.group_name
    # print("name " + name)

    # Para cargar listas desde cliente arrays json parse 
    tweet_list_id = json.loads(request.vars.tweet_list_id)
    tweet_list = json.loads(request.vars.tweet_list)
    main_id = request.vars.main_id

    tweet_list_for_group = []
    for tweet in tweet_list:
        tweet_json= json.dumps(tweet)
        tweet = Objeto_JSON(tweet_json)
        print("\nuser: ")
        print(tweet.user['screen_name'])
        id = tweet.id_str

    # for id in tweet_list_id:
        print("id " + str(id))
        tweet_recuperado = db(db.master_case_table.tweet_id == id, db.master_case_table.tweet_id).select().first()
        if (tweet_recuperado is not None):
            print("Encontrado, appending" + str(tweet_recuperado.id))
            tweet_list_for_group.append(tweet_recuperado.id)
        else:
            print("tengo que insertar primero")

            user_name = tweet.user['screen_name']
            print(user_name)
            stored_user = db.tweet_users_table.update_or_insert(db.tweet_users_table.name == user_name,
                name = user_name,
                user_data = json.dumps(tweet.user)
            )

            retweets = get_retweets(id)

            result = db.master_case_table.update_or_insert(db.master_case_table.tweet_id == id,
            title = tweet.full_text,
            user_name = user_name,
            tweet_id = id,
            tweet = tweet_json,
            utls = tweet.urls,
            tweet_user = stored_user,
            retweets = json.dumps(retweets)
            )

            tweet_list_for_group.append(result)


    for p in tweet_list_for_group:
        print('retrieved' + str(p))

    print("looking for main")
    main_id = db(db.master_case_table.tweet_id == main_id).select().first().id


    result = db.group_tweets.update_or_insert(db.group_tweets.main_id == main_id,
        main_id = main_id,
        name = name,
        ids = tweet_list_for_group
    )






def fetch_data():
            
    data = db(db.master_case_table).select()

    return response.json(dict(data = data))
























# TO-DO
# En el metodo una vex esta loggeado en twitter con las credentials, hacer un get request normal
# como en la pagina del drive (problemas & soluciones), del tio que hace
# @GET(url, q=word?&count=ffff) y ver el resultado
# (bypass teweetpy api)



# ____________________________ sIMILAR TWEETS _______________________________________

# ____________________________________________________________________________________
def extract_title(url):
    import requests
    from bs4 import BeautifulSoup as bs

    # url = 'http://www.oldbaileyonline.org/browse.jsp?id=t17800628-33&div=t17800628-33'
    url = "https://t.co/83chfo0PL9"
    # url2 = "https://maldita.es/malditobulo/quaden-bayles-enanismo-acondroplasia-disneyland-estafa-australia/?utm_content=buffercab8b&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer"

    r = requests.get(url)
    soup = bs(r.content, 'lxml')
    title = soup.select_one('title').text
    # print(title)

    # QUITAMOS LOS ICONOS
    import re
    emoji_pattern = re.compile("["
            u"\U0001F600-\U0001F64F"  # emoticons
            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
            u"\U0001F680-\U0001F6FF"  # transport & map symbols
            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                            "]+", flags=re.UNICODE)
    print(emoji_pattern.sub(r'', title)) # no emoji



# def get_similar_tweets():
    # si los tengo los cojo de la db
    # sino los extraigo
    # todo esto de acuerdo a la fecha de last_update
    # informo de los nuevos tweets encontrados

def get_noticias_similares(url, exclude_retweets):
    print("\n\nAPI method - Get Noticias Similares")

    print("looking for similar news of: " + url)

    # url = 'https://www.vozpopuli.com/opinion/lilith-verstrynge-injustos-pablo-iglesias_0_1344166589.html'
    try:
        soup = BeautifulSoup(urllib.request.urlopen(url), "lxml")
        # soup = BeautifulSoup(urllib.urlopen("https://www.google.com"))
        print (soup.title.string)
        title = soup.title.string

        api = requires_twitter_auth()
   
        results = api.GetSearch(title, count = 20)
        tweets = [tweet.AsDict() for tweet in results]
    except:
        tweets = []


    return tweets

def get_similar_tweets():   
    print(request.vars)

    # Evitar repetidos
    # group_id = request.vars.group_id
    # group_data = db(db.group_tweets.id == group_id).select.first()

    results_raw = []
    if (request.vars.es_noticia=='true'):
        results_raw = get_noticias_similares(request.vars.url_noticia, request.vars.exclude_retweets)


    results_article = []
    retweets_results_article = []
    for tweet in results_raw:
        if ("RT" not in tweet['full_text']):
            print(tweet['full_text'])
            results_article.append(tweet)
            # get the retwets from each one
            # print("XXXX")
            # print(tweet['id_str'])
            # retweets_results_article.append(update_retweets(tweet['id_str']))
            

    return response.json(dict(results_article = results_article, retweets_results_article =retweets_results_article))
    # return response.json(dict(similar_tweets = similar_tweets))

    # text = request.vars.text
    # id = request.vars.id
    # username = "-@" + str(request.vars.username)
    # text = text + username

    # # Si no hay texto que buscar
    # if((text is None) or (text == "")):
    #     return response.json(dict(data = data, success = False))


    # # Si ya existen en la base de datos
    # if (False):
    #     # NOT WORKING YET
    #     print(id)
    #     print(type(id))
    #     results = db(db.master_case_table.tweet_id == id)
    #     print("\n\nSIMILAR")
    #     print(results)
    #     similar_tweets = [tweet.AsDict() for tweet in results]
    #     similar_tweets = json.dumps(results)
    # else:
    #     api = requires_twitter_auth()   
    #     results = api.GetSearch(text, count = 1)

    #     similar_tweets = [tweet.AsDict() for tweet in results]
    #     # Falta guardarlo en la base de datos
    


    # return response.json(dict(similar_tweets = similar_tweets))









# ______________________ TEST METHODS ________________________________ 

def log_on_twitter():
    print('\nloggin on twitter')
    api = requires_twitter_auth()
    print(api.VerifyCredentials())

# Metodo de prueba para postear
def post_tweet():
    print('post tweet api method')

    requires_twitter_auth()
    string =request.vars.string

    api = twitter.Api(consumer_key = consumer_key,consumer_secret = consumer_secret
    , access_token_key = access_token, access_token_secret = access_secret)

    status = api.PostUpdate(string)
    print('end method')





# ____________________________ BUSCADOR INDEX _______________________________________


# Metodo de ayuda a clean_word
def clean_word(word):
    text = word
    text = text.split()
    texto_completo = ""
    for t in text:
        texto_completo = texto_completo + " +" + t
    return texto_completo


# Warning los retweets estan con trim_user=True, testear otras opciones
# -TODO
    # - get the number of tweets from client
    # - try catchs
def get_tweet():
    print('\n\nget tweet method')    
    # get the query for search on twitter
    word = request.vars.word

    word = clean_word(word)

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
        tweets = api.GetSearch(term=word, count=2)    
        tweets = [tweet.AsDict() for tweet in tweets]

        # list of couples [(tweet1, retweeets1), (tweet2, retweeets2), (...)]
        list_tweets_and_retweets = []

        for tweet in tweets:
            tweet_json = json.dumps(tweet)
            tweet_objeto = Objeto_JSON(tweet_json)
            # print (tweet_objeto.id)
            
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
        # variable = db.tabla_tweets_retweets.update_or_insert(
        #     stored_data = json.dumps(list_tweets_and_retweets)
        # )

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









# DEPRECATED
# def mark_as_fake():
#     print('marked as fake')    
#     stored_data = request.vars.stored_data
#     topic = request.vars.topic
#     search_line = request.vars.search_line

#     if ((stored_data is None) or (stored_data == '')):
#         error = 'Data to store was empty, nothing stored'
#         return response.json(dict(result = False, error = error))

#     # Storing data
#     variable = db.fake_news_table.insert(
#         stored_data = stored_data,
#         search_line = search_line
#     )

#     # Return True if data is stored correctly
#     if (variable is None):
#         error = 'Error when storing data'
#         return response.json(dict(result = False, error = error))

#     return response.json(dict(result = True, error = None))







#           TESTING PURPOSES
# ____________________________________________________________________________________
# The next methods have been created only for testing purposes



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






# # Store data on the database
# def save_data():
#     # Retrieve the data and prepare the variables
#     stored_data = request.vars.stored_data
#     error = None

#     if ((stored_data is None) or (stored_data == '')):
#         error = 'Data to store was empty, nothing stored'
#         return response.json(dict(result = False, error = error))

#     # Storing data
#     variable = db.tabla_tweets_retweets.insert(
#         stored_data = stored_data
#     )

#     # Return True if data is stored correctly
#     if (variable is None):
#         error = 'Error when storing data'
#         return response.json(dict(result = False, error = error))

#     return response.json(dict(result = True, error = error))







# GET limits
# https://tutorialedge.net/python/creating-twitter-bot-python/
# def get_limit():
#     try:
#         result = t.application.rate_limit_status()
#         print result
#     except TwitterHTTPError as e:
#         print "Error: ", e
#         return None



# MANEJO JSON OBJECT DICT LIST 
# tweet = db(db.master_case_table.tweet_id == tweet_id).select().first()
# retweets = tweet.retweets
# print(type(retweets)) # STRING
# b = json.loads(retweets) # LIST (porque el string era una lista)
# FORMA A 
# for item in b:
#     item = json.dumps(item) 
#     obj = Objeto_JSON(item) #O BJETO MANEJABLE
#     print(obj.id)

# FORMA B 
# print(type(b)) # LIST
# for l in b:   # RECORRO la lista, viendo cada objeto de dentro (DICT)
#    a = l["created_at"] # Accedo al atributo del dict
#    print(type(a))


# Texto respuesta fake news hola
# Hola! Formo parte de un proyecto que se dedica a desmentir Fake News, y parece que el algoritmo ha detectado tu tweet como falso, 
#  Si puedes, comprueba la fuente de nuevo, y si me he equivocado, házmelo saber (Responde con un "NO") y así puedo mejorar, gracias!



# Salva a tres gatitos de morir congelados con ayuda de una taza de café - https://t.co/n1Qz4J8g0Z https://t.co/57iA2iVRbR
# https://es.rt.com/7b5b esta url y esta llevan a la misma pag https://t.co/n1Qz4J8g0Z

# El parlamento europeo obliga a retirar reconocimiento


# ____________________________ RETRIEVE DATA TO JSON _________________________________________

# tweets_timeline = api.GetUserTimeline(screen_name =user_to_search)
# data = [tweet.AsDict() for tweet in tweets_timeline]
# return response.json(dict(data = data))
# ____________________________________________________________________________________________

