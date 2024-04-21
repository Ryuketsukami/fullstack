import {useState, createContext} from "react";

export const ThemeContext = createContext(null)

const listOfColors = [
    {
        text:{
            tertiary:'text-yellow-400',
            myHover:{
                tertiary:'hover:text-yellow-400',
                dark:{
                    tertiary:'dark:hover:text-yellow-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-yellow-400',
            }
        },
        shadow:{
            tertiary:'shadow-[#facc15_0px_0px_100px_8px] dark:shadow-[#facc15_0px_0px_100px_4px]'
        },
        border:'border-yellow-400',
        outline:{
            tertiary:'outline-yellow-400',
            hover:{
                tertiary:'hover:outline-yellow-400 dark:hover:outline-yellow-400'
            },
        },
        rotation:'hue-rotate-55',
        button:{
            hover:'hover:bg-yellow-500'
        }

    },
    {
        text:{
            tertiary:'text-orange-400',
            myHover:{
                tertiary:'hover:text-orange-400',
                dark:{
                    tertiary:'dark:hover:text-orange-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-orange-400',
            }
        },
        shadow:{
            tertiary:'shadow-[#fb923c_0px_0px_100px_8px] dark:shadow-[#fb923c_0px_0px_100px_4px]'
        },
        border:'border-orange-400',
        outline:{
            tertiary:'outline-orange-400',
            hover:{
                tertiary:'hover:outline-orange-400 dark:hover:outline-orange-400 '
            },
        },
        rotation:'hue-rotate-45',
        button:{
            hover:'hover:bg-orange-500'
        }
    },
    {
        text:{
            tertiary:'text-red-400',
            myHover:{
                tertiary:'hover:text-red-400',
                dark:{
                    tertiary:'dark:hover:text-red-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-red-400',
            }
        },
        shadow:{
            tertiary:'shadow-[#f87171_0px_0px_100px_8px] dark:shadow-[#f87171_0px_0px_100px_4px] '

        },
        border:'border-red-400',
        outline:{
            tertiary:'outline-red-400',
            hover:{
                tertiary:'hover:outline-red-400 dark:hover:outline-red-400 '
            },
        },
        rotation:'hue-rotate-0',
        button:{
            hover:'hover:bg-red-500'
        }
    },
    {
        text:{
            tertiary:'text-pink-400',
            myHover:{
                tertiary:'hover:text-pink-400',
                dark:{
                    tertiary:'dark:hover:text-pink-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-pink-400',
            }
        },
        shadow:{
            tertiary:'shadow-[#f472b6_0px_0px_100px_8px] dark:shadow-[#f472b6_0px_0px_100px_4px]'
        },
        border:'border-pink-400',
        outline:{
            tertiary:'outline-pink-400',
            hover:{
                tertiary:'hover:outline-pink-400 dark:hover:outline-pink-400'
            },
        },
        rotation:'-hue-rotate-30',
        button:{
            hover:'hover:bg-pink-500 dark:hover:bg-pink-500'
        }
    },
    {
        text:{
            tertiary:'text-purple-400',
            myHover:{
                tertiary:'hover:text-purple-400',
                dark:{
                    tertiary:'dark:hover:text-purple-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-purple-400',
            }
        },
        shadow:{
            tertiary:' shadow-[#c084fc_0px_0px_100px_8px] dark:shadow-[#c084fc_0px_0px_100px_4px]'
        },
        border:'border-purple-400',
        outline:{
            tertiary:'outline-purple-400',
            hover:{
                tertiary:'hover:outline-purple-400 dark:hover:outline-purple-400'
            },
        },
        rotation:'-hue-rotate-90',
        button:{
            hover:'hover:bg-purple-500'
        }
    },
    {
        text:{
            tertiary:'text-blue-400',
            myHover:{
                tertiary:'hover:text-blue-400',
                dark:{
                    tertiary:'dark:hover:text-blue-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-blue-400',
            }
        },
        shadow:{
            tertiary:'shadow-[#60a5fa_0px_0px_100px_8px] dark:shadow-[#60a5fa_0px_0px_100px_4px]'
        },
        border:'border-blue-400',
        outline:{
            tertiary:'outline-blue-400',
            hover:{
                tertiary:'hover:outline-blue-400 dark:hover:outline-blue-400'
            },
        },
        rotation:'-hue-rotate-120',
        button:{
            hover:'hover:bg-blue-500'
        }
    },
    {
        text:{
            tertiary:'text-teal-400',
            myHover:{
                tertiary:'hover:text-teal-400',
                dark:{
                    tertiary:'dark:hover:text-teal-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-teal-400',
            }
        },
        shadow:{
            tertiary:'shadow-[#2dd4bf_0px_0px_100px_8px] dark:shadow-[#2dd4bf_0px_0px_100px_4px]'
        },
        border:'border-teal-400',
        outline:{
            tertiary:'outline-teal-400',
            hover:{
                tertiary:'hover:outline-teal-400 dark:hover:outline-teal-400'
            },
        },
        rotation:'hue-rotate-180',
        button:{
            hover:'hover:bg-teal-500'
        }
    },
    {
        text:{
            tertiary:'text-lime-400',
            myHover:{
                tertiary:'hover:text-lime-400',
                dark:{
                    tertiary:'dark:hover:text-lime-400'
                }
            }
        },
        bg:{
            tertiary:{
                main:'bg-lime-400',
            }
        },
        shadow:{
            tertiary:'shadow-[#a3e635_0px_0px_100px_8px] dark:shadow-[#a3e635_0px_0px_100px_4px] '
        },
        border:'border-lime-400',
        outline:{
            tertiary:'outline-lime-400',
            hover:{
                tertiary:'hover:outline-lime-400 dark:hover:outline-lime-400'
            },
        },
        rotation:'hue-rotate-90',
        button:{
            hover:'hover:bg-lime-500'
        }
    },
]


// Known issue: when reloading page, the mode goes normal first for a millisecond
export function ThemeProvider({children}) {

    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('dark')) || false);
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || listOfColors[0]);

    const handleColorChange = (newTheme) =>{
        setTheme(newTheme);
        document.documentElement.classList.add('theme');
        localStorage.setItem('theme', JSON.stringify(newTheme));

    }


    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const value = { darkMode, toggleDarkMode, theme, handleColorChange, listOfColors};

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}