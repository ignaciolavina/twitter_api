# -*- coding: utf-8 -*-
# this file is released under public domain and you can use without limitations

# ----------------------------------------------------------------------------------------------------------------------
# this is the main application menu add/remove items as required
# ----------------------------------------------------------------------------------------------------------------------

response.menu = [
    (T('Dahboard'), False, URL('default', 'index'), [])
]

# ----------------------------------------------------------------------------------------------------------------------
# provide shortcuts for development. you can remove everything below in production
# ----------------------------------------------------------------------------------------------------------------------

if not configuration.get('app.production'):
    _app = request.application
    response.menu += [        
        (T('graphs'), False, URL('default', 'graphic_test')),
        (T('vue graph 2'), False, URL('default', 'graphic_test_two')),
        (T('Index Cuatro'), False, URL('default', 'index_cuatro')),        
        (T('data_stored'), False, URL('default', 'data_stored')),   
        # (T('Partidos'), False, URL('default', 'partidos')),
        # (T('Resultados'), False, URL('default', 'resultados'))
    ]

