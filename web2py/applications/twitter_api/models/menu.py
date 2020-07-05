# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

# ----------------------------------------------------------------------------------------------------------------------
# this is the main application menu add/remove items as required
# ----------------------------------------------------------------------------------------------------------------------

response.menu = [
    (T('Search term'), False, URL('default', 'index'), [])
]

# ----------------------------------------------------------------------------------------------------------------------
# provide shortcuts for development. you can remove everything below in production
# ----------------------------------------------------------------------------------------------------------------------

if not configuration.get('app.production'):
    _app = request.application
    response.menu += [        
        (T('Search user'), False, URL('default', 'buscador_by_user')),    
        (T('Relevant accounts'), False, URL('default', 'explorador')),
        (T('Stored tweets'), False, URL('default', 'panel_guardados')),
        (T('Grouped tweets'), False, URL('default', 'grouped_tweets')),
        (T('Check bots'), False, URL('default', 'check_bot_page')),
         (T('Fake News Panel'), False, URL('default', 'fake_news_panel')), 

        #(T('panel'), False, URL('default', 'panel')),
        # (T('Users_table'), False, URL('default', 'tweet_users_table')),        
        # (T('data_stored'), False, URL('default', 'data_stored')),          
        # (T('Fake news table'), False, URL('default', 'fake_news')),    
        #(T('tracking_table'), False, URL('default', 'tracking_table')),
        #(T('alerted_tweets'), False, URL('default', 'alerted_tweets'))
        # (T('Test_table'), False, URL('default', 'test_table')),
    ]

