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
        # (T('Dashboard'), False, URL('default', 'index')),
        # (T('Parejas'), False, URL('default', 'parejas')),
        # (T('Nueva Pareja'), False, URL('default', 'nueva_pareja')),        
        # (T('Grupos'), False, URL('default', 'grupos')),   
        # (T('Partidos'), False, URL('default', 'partidos')),
        # (T('Resultados'), False, URL('default', 'resultados'))
    ]

