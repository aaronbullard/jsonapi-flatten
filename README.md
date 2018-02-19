# JSON API Flatten

Converts a JSON API response into a navigatable json object.

#### Install

Node dependencies

```
npm install jsonapi-flatten
```

#### Usage

```
import {Response} from 'jsonapi-flatten'

// Response
let jsonapi = new Response({
    "data": [
        {
            "type": "authors",
            "id": "1",
            "attributes": {
                "name": "Madge Mohr DVM 2",
                "date_of_birth": "1977-08-21",
                "date_of_death": "2009-09-14"
            },
            "relationships": {
                "photos": {
                    "data": []
                },
                "books": {
                    "data": [
                        {
                            "type": "books",
                            "id": "41"
                        }
                    ]
                }
            },
            "links": {
                "self": "/v2/authors/1"
            }
        },
        {
            "type": "authors",
            "id": "3",
            "attributes": {
                "name": "Zelma Ortiz DDS",
                "date_of_birth": "1992-09-06",
                "date_of_death": "2000-12-19"
            },
            "relationships": {
                "photos": {
                    "data": [
                        {
                            "type": "photos",
                            "id": "3"
                        }
                    ]
                },
                "books": {
                    "data": [
                        {
                            "type": "books",
                            "id": "36"
                        },
                        {
                            "type": "books",
                            "id": "48"
                        }
                    ]
                }
            },
            "links": {
                "self": "/v2/authors/3"
            }
        },
        {
            "type": "authors",
            "id": "4",
            "attributes": {
                "name": "Fermin Barrows Sr.",
                "date_of_birth": "1991-03-18",
                "date_of_death": "1975-11-07"
            },
            "relationships": {
                "photos": {
                    "data": [
                        {
                            "type": "photos",
                            "id": "4"
                        }
                    ]
                },
                "books": {
                    "data": [
                        {
                            "type": "books",
                            "id": "1"
                        },
                        {
                            "type": "books",
                            "id": "26"
                        },
                        {
                            "type": "books",
                            "id": "44"
                        },
                        {
                            "type": "books",
                            "id": "46"
                        }
                    ]
                }
            },
            "links": {
                "self": "/v2/authors/4"
            }
        },
        {
            "type": "authors",
            "id": "5",
            "attributes": {
                "name": "Terry Durgan",
                "date_of_birth": "2011-03-06",
                "date_of_death": "2017-04-13"
            },
            "relationships": {
                "photos": {
                    "data": [
                        {
                            "type": "photos",
                            "id": "5"
                        }
                    ]
                },
                "books": {
                    "data": [
                        {
                            "type": "books",
                            "id": "6"
                        },
                        {
                            "type": "books",
                            "id": "16"
                        },
                        {
                            "type": "books",
                            "id": "50"
                        }
                    ]
                }
            },
            "links": {
                "self": "/v2/authors/5"
            }
        },
        {
            "type": "authors",
            "id": "6",
            "attributes": {
                "name": "Annalise Walsh",
                "date_of_birth": "2004-11-27",
                "date_of_death": "1997-07-20"
            },
            "relationships": {
                "photos": {
                    "data": [
                        {
                            "type": "photos",
                            "id": "6"
                        }
                    ]
                },
                "books": {
                    "data": [
                        {
                            "type": "books",
                            "id": "4"
                        },
                        {
                            "type": "books",
                            "id": "5"
                        },
                        {
                            "type": "books",
                            "id": "21"
                        }
                    ]
                }
            },
            "links": {
                "self": "/v2/authors/6"
            }
        }
    ],
    "included": [
        {
            "type": "books",
            "id": "41",
            "attributes": {
                "title": "Koelpin, Franecki and McClure",
                "date_published": "1974-07-08",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "36",
            "attributes": {
                "title": "Connelly Ltd",
                "date_published": "1971-06-08",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "48",
            "attributes": {
                "title": "Murray-Schultz",
                "date_published": "1997-09-03",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "1",
            "attributes": {
                "title": "Schultz, Pfannerstill and Nienow",
                "date_published": "1979-02-19",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "26",
            "attributes": {
                "title": "Altenwerth-Rodriguez",
                "date_published": "1985-02-19",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "44",
            "attributes": {
                "title": "Reilly-Klein",
                "date_published": "1988-09-14",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "46",
            "attributes": {
                "title": "Jast-Kovacek",
                "date_published": "1995-01-10",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "6",
            "attributes": {
                "title": "Hills, Goodwin and Schummxxxxxxx",
                "date_published": "1996-06-23",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "16",
            "attributes": {
                "title": "Zboncak, Koch and Conroy",
                "date_published": "2008-07-30",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "50",
            "attributes": {
                "title": "Metz Group",
                "date_published": "2001-05-14",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "4",
            "attributes": {
                "title": "Roberts Group",
                "date_published": "1983-11-23",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "5",
            "attributes": {
                "title": "Douglas Ltd",
                "date_published": "1988-09-07",
                "isbn": null
            }
        },
        {
            "type": "books",
            "id": "21",
            "attributes": {
                "title": "Frami Inc",
                "date_published": "1994-10-06",
                "isbn": null
            }
        }
    ]
});

let result = jsonapi.flatten();

// Result
/* console.log(result);
...
[
	{
		"_id": "1",
		"_type": "authors",
		"name": "Madge Mohr DVM 2",
		"date_of_birth": "1977-08-21",
		"date_of_death": "2009-09-14",
		"photos": [],
		"books": [
			{
				"_id": "41",
				"_type": "books",
				"title": "Koelpin, Franecki and McClure",
				"date_published": "1974-07-08",
				"isbn": null
			}
		]
	},
	{
		"_id": "3",
		"_type": "authors",
		"name": "Zelma Ortiz DDS",
		"date_of_birth": "1992-09-06",
		"date_of_death": "2000-12-19",
		"photos": [
			{
				"_id": "3",
				"_type": "photos"
			}
		],
		"books": [
			{
				"_id": "36",
				"_type": "books",
				"title": "Connelly Ltd",
				"date_published": "1971-06-08",
				"isbn": null
			},
			{
				"_id": "48",
				"_type": "books",
				"title": "Murray-Schultz",
				"date_published": "1997-09-03",
				"isbn": null
			}
		]
	},
	{
		"_id": "4",
		"_type": "authors",
		"name": "Fermin Barrows Sr.",
		"date_of_birth": "1991-03-18",
		"date_of_death": "1975-11-07",
		"photos": [
			{
				"_id": "4",
				"_type": "photos"
			}
		],
		"books": [
			{
				"_id": "1",
				"_type": "books",
				"title": "Schultz, Pfannerstill and Nienow",
				"date_published": "1979-02-19",
				"isbn": null
			},
			{
				"_id": "26",
				"_type": "books",
				"title": "Altenwerth-Rodriguez",
				"date_published": "1985-02-19",
				"isbn": null
			},
			{
				"_id": "44",
				"_type": "books",
				"title": "Reilly-Klein",
				"date_published": "1988-09-14",
				"isbn": null
			},
			{
				"_id": "46",
				"_type": "books",
				"title": "Jast-Kovacek",
				"date_published": "1995-01-10",
				"isbn": null
			}
		]
	},
	{
		"_id": "5",
		"_type": "authors",
		"name": "Terry Durgan",
		"date_of_birth": "2011-03-06",
		"date_of_death": "2017-04-13",
		"photos": [
			{
				"_id": "5",
				"_type": "photos"
			}
		],
		"books": [
			{
				"_id": "6",
				"_type": "books",
				"title": "Hills, Goodwin and Schummxxxxxxx",
				"date_published": "1996-06-23",
				"isbn": null
			},
			{
				"_id": "16",
				"_type": "books",
				"title": "Zboncak, Koch and Conroy",
				"date_published": "2008-07-30",
				"isbn": null
			},
			{
				"_id": "50",
				"_type": "books",
				"title": "Metz Group",
				"date_published": "2001-05-14",
				"isbn": null
			}
		]
	},
	{
		"_id": "6",
		"_type": "authors",
		"name": "Annalise Walsh",
		"date_of_birth": "2004-11-27",
		"date_of_death": "1997-07-20",
		"photos": [
			{
				"_id": "6",
				"_type": "photos"
			}
		],
		"books": [
			{
				"_id": "4",
				"_type": "books",
				"title": "Roberts Group",
				"date_published": "1983-11-23",
				"isbn": null
			},
			{
				"_id": "5",
				"_type": "books",
				"title": "Douglas Ltd",
				"date_published": "1988-09-07",
				"isbn": null
			},
			{
				"_id": "21",
				"_type": "books",
				"title": "Frami Inc",
				"date_published": "1994-10-06",
				"isbn": null
			}
		]
	}
]
*/
```
