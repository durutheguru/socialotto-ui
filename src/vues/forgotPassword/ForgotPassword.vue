<template>
  <div
    class="signupMainOuterDiv relative top-4 sm:mx-auto  sm:max-w-lg mb-8 mt-12"
  >
    <div v-if="!emailSent" class="signupMain sm:bg-white py-8 px-10 sm:px-10">
      <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv">
        <div class="flex items-center justify-center mt-4">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect width="80" height="80" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image0_106:269"
                  transform="scale(0.00195312)"
                />
              </pattern>
              <image
                id="image0_106:269"
                width="512"
                height="512"
                xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d13mFxXffDx76pLlmTJveKGe8E0G2wwmOYQmmmBECB0CCUQCC15IRQnQHgJhpC8hJKEBEzvxcYYY2wDBheaG7hbbiqW1bt23z/OjLVa7Wpmdk6598738zzn2dVq97Sdvec35557zhCS6mAv4AHAQcCBwO7AbqPS7sBCYBYwu/UzU4BdW58PAytbn9/X+rii9bV7gKWtdA+wGLgRuBnYmKpBksoaKl0BSfdbABzbSscBhxMG/IPZNqjnNAwsAm4gBATXAlcAvwXWFaiPpIgMAKT8phAG94cCDwaOJwz6B5SsVA+2EIKBK4HLgYuA60pWSFLvDACk9BYAjwJOA04mDPrzitYovruBH7fShcDtZasjqRMDACm+OcBjgTOAxxDe4U8pWaECfgd8vZWuKVwXSZKSORR4E3AesB4YMd2frgPOAo6ZdO9KklQhBwFvBC4lLJgrPdDWIV0BvAqYO4n+liSpmD2AvyYMZKUH0zqnVcB/ACf01v2SJOUzFXga4X72RsoPnk1Kw8C5wOO6/m1IkpTYbsDbgFsoP1AOQroceC6Dt2BSklQRRwOfJmx2U3pQHMT0W+ApHX9LkiRFciLwP4SNbkoPgib4BeExSkmSkjgFOJ/yA55p/PQNwnbIkiRFcQzwFXyErw5pHfAeYOZ4v0hJkrrxAOB/ga2UH9hMvaXrgNN3/JVKkjSxOYR3kWspP5CZJp+GgU/hZkKSpC48n3BATenByxQv3UhYvyFJ0g72B75J+cHKlCZtBT4GzECSJMLufX8DrKH8IGVKn34JHIgkaaAdTniGvPSgZMqblgCPR5I0kF4MrKb8YGQqk7YQFnq6nbAkDYg9ge9RfgAyVSN9FZiNJKnRHg7cSvlBx1StdBmwF5KkxhkC3ohH9JomTjcBRyBpB0OlKyBN0lzgc8CzSlcksc3ACuC+1sdVhIBnXev/VwK7jvr+mcA8YH7r67u10iBbCjyN8KSApBYDANXRQcC3gQeVrkgEq4AbgD+20q3A3cCdwF3A8ghlzAT2JuyJcAhwGPBA4CjgOMIOiU23mnDE8CWlKyJVhQGA6uZUwulwdby3ewdwBfBr4CrgN62vlTSVMEX+YOARwKOAE1pfb5q1wFOBiwrXQ5LUoz8DNlD+vnK36Q+EPetfRL2Os51HGCj/jXAPvXQ/xkxrgSfE6ypJUmqvp/qn960Dvg+8Djg0TTcUcQzwD8A1lO/jGGk98MSoPSRJim4IOIvyg8bOBv2vEw4bGoTT6Y4HzgbupXzf95NWAydF7htJUiRDwCcoP1iMTcPAxcBfMhiD/nhmAi8ALqf872OyaSlwdOyOkST1Zwj4JOUHidHpXuBD+Fz5WKcB3yUERqV/R72m2/EQIUmqjCnAZyg/OLTTdcBrGIzH5frxMOq5HfO1wIIE/SFJ6kGV3vlfBTwDH5ft1WnA7yj/++slnUczH32UpNr4AOUHAwf+/k0D3kTYqbD077PbdHaSnpAkdfRGyg4Ai4BX4TvBmPYB/of6rA94VZpukCRN5CWUGyRWA+8AZqVu5AB7LGHBXekBvlPaSNhtUpKUwWmU2+Hvu4SzBZTersCXKT/Id0qLgD0S9YEkqeUowoE3uS/ydwFnZmiftjcEvIHqb+n8XVwDIknJ7EGZvea/AuyeoX2a2IMJZyWUHuh3lt6SrPWSNMCmAueT94K+grB7naphPvAjyg/0E6VNuF2wJEX3QfJezK/BbV+raBrwacoP9hOlmxjc7Z4lKbpnknfF/2eB2VlapskYAv6R8oP9ROmj6ZouSYPjQPIt+tsCvD1PsxTBy4DNlB/wx6atwGMStluSGm8a8DPyXLRXAH+Sp1mK6HmEwK30oD823QDskrDdktRo7yXPxfoO4NhMbVJ8L6WaOwd6K0CSJuEU8ryzuwE4OE+TlNDrKD/gj02bgQelbLQkNc0s4HrSX6B/S9h7Xs3wNsoP+mPTpbhBkCR1LccJf7/H7Vub6CzKD/pj018mbbEkNcSJhA1VUl6Qrwf2zdUgZTUEfInyg/7otBhYkLLRklR3U4GrSHsxvhkH/6bbBfgN5Qf+0ckFgZK0E6kXci0DjszWGpV0EOGdd+mBv502AoclbbEk1dTuhAE61QV4HZ7bPmgeRRh4Sw/+7fT5tM2VpHr6DOkuvMOEDWM0eN5A+YG/nbYS1rhIklqOJ1wcU114z8rXFFXQdyk/+LfTeYnbKkm18n3SXXC/B0zJ1xRV0N7AEsoP/u30mLTNlaR6OI10F9pFhLUF0jMoP/C30w8Tt1WSauEXpLnIbiYsApPaUq4z6TWdlLitklRpf0K6C+y7MrZD9TAXuInyg/8I8O3EbZWkSruENBfXK4HpGduh+ngS5Qf/EcKTKSckbqskVdJjSHNh3QAck7Edqp+vUT4AGAG+kLqhklRF55PmovqOnI1QLR0IrKF8ALAJ2C9xWyWpUo4jTIHGvqBeg1P/6s47KB8AjADvS91QSaqST5PmYnp6zkao1mYA11I+AFgCzErcVkmqhN2AtcS/kJ6TsxFqhKosCHxx6oZKUhW8lfgX0PWE+7pSry6kfABwefJWSlIFXE/8C+gHs7ZATXISadaj9Jo8JEhSo6XY9nc54baCNFnfoXwAcHbyVkpSQf9F/Aunj/2pXyeQ9jTKbtIyYGbqhkpSCXOBVcS9aN4LzMvZCDXWFyg/C/Cc5K2UpAJeSPwL5j9kbYGa7EjKzwL8IHkrJamAbxH3YrkaWJi1BWq6b1I2ANgC7J28lZKU0TzCo3oxL5b/mrUFGgQnUTYAGAH+KnkrJSmjFxD3IjkMHJW1BRoUl1I2ALgwfRMlKZ+vEPcieW7e6muAnEnZAMDbAJIaYyphtX7Mi+QzsrZAg2SI8mcEvDZ5KyUpg0cR9+K4GE/8U1p/RdkA4CfpmyhJ6Z1F3Ivj/81bfQ2gecTfs6KXtAV3t5TUAJcT9+J4fN7qa0B9hrKzAM9P30RJSmcusJl4F8Xr8lZfA+xkygYAn0vfRElK5wziXhTfnbf6GnBXUS4AWAJMSd9EqXu+INWLUyPn99XI+Uk789mCZe8JPKxg+ZLUlx/j9L/qa1dgHeVmAd6TvIVSD5wBULemELZWjcWDUpTbSuB7Bcs/vWDZkjRpRxL33dAT8lZfAuCZlJsB2ADMTt9ESYrrecS7EK4GZuatvgTALOA+ygUBj0vfRKk73gJQtx4SMa9LgY0R85O6tYFwTHAppxUsW9qOAYC6dULEvC6OmJfUqy8VLNt1AJJq5ybiTYOekrnu0mhTgXsotw5gVvomSlIcMwj7mce4AK5t5SeV9P8otw7gERnaJ3XkLQB14zDCu6YYfg1sipSXNFnfLVh2zMdppUkzAFA3Do+Y1xUR85Im68eEp1FKeHihcqXtGACoGwdHzOuqiHlJk7URuKBQ2QYAqgQDAHVjv4h5XRkxL6kf3ylU7hHAgkJlS/czAFA3YgUAm4E/RspL6tf3ga0Fyh3Cg4FUAQYA6kasAOBGQhAgVcFS4LJCZT+oULnS/QwA1I19I+VzbaR8pFh+WKjcYwuVK93PAEDd2C1SPtdHykeKpdRCwOMKlSvdzwBA3dg1Uj63RMpHiuVywjHBuR2L118V5gtQnUwn3hGmt0bKR4plC3BRgXLnAIcUKFe6nwGAOon17h8MAFRNPy5UrrcBVJQBgDqJ9bzyCLAoUl5STD8qVO6RhcqVAAMAdbZ3pHzuwzMAVE3XA3cUKPewAmVK9zMAUCf7RMpncaR8pBQuKVCmAYCKMgBQJ7ECgCWR8pFS+FmBMg0AVJQBgDrZK1I+yyLlI6VQIgA4EJhZoFwJMABQZ7ECgFWR8pFS+D35X6NTiXvSptQTAwB1EusxwFJnr0vd2Ar8skC53gZQMQYA6iRWALAmUj5SKq4D0EAxAFAn8yPlYwCgqisRADywQJkSYACgzmLNAJTYb13qxeWEDatyOjRzedL9DADUydxI+ayIlI+UykrgxsxlOgOgYgwA1MmMSPncFykfKaUrM5d3QObypPsZAKiTaZHycQZAdZA7AJgL7JK5TAkwAFBnsQIAZwBUB1cUKDPWbptSTwwA1Mn0SPk4A6A6uAoYzlymAYCKMABQJ1Mj5eNTAKqDVcANmcuMdeKm1BMDAHUSYwZgfStJdfC7zOU5A6AiDADUSYw1AJ4DoDr5febyDABUhAGAdmYqcV4jGyPkIeVydebyvAWgIgwAtDOxngDYHCkfKQdnADQQDAC0M0OR8jEAUJ3cDKzNWJ4BgIowANDOxBq4t0TKR8phGLgmY3neAlARBgDama3EeSbaGQDVTc51AAsyliXdzwBAncQYvA0AVDfXZSwr1oFbUk8MANSJAYAG0R8yljUVmJ2xPAkwAFBnBgAaRDkDAHAWQAUYAKiTGM/wb42Qh5TTzeQNXOdlLEsCDADUWYwV/L7OVDdbCEFALs4AKDsvzOpkU4Q8Yh0oJOX0x4xlOQOg7AwA1EmMaVADANVRznUAzgAoOwMAdbIhQh6xthSWcsp5LLAzAMrOAECdrIuQh68z1dHtGctyBkDZeWFWJzH2RHcGQHV0W8ayDACUnQGAOokRALgGQHWUMwAwSFZ2BgDqxABAg2odsCxTWV6LlZ0vOnXiLQANslszleO1WNn5olMnMQKAmRHykErItRBwKFM50v0MANRJjKcADABUVwYAaiwDAHXiDIAGWa6FgF6LlZ0vOnViAKBBlisAcAZA2RkAqJM1EfIwAFBdOQOgxvJFp05irAGYho8Cqp6cAVBjGQCokxgzAAAzIuUj5XQv8f4GdsYAQNkZAKiTGGsAAGZFykfKLceTAF6LlZ0vOnUS692PAYDqKkcAsDFDGdJ2DADUSYw1AOAtANXX3RnKiPV3JnXNAECdxJoB8EkA1dWSDGUYACg7AwB14hoADbocAcD6DGVI2zEAUCexAgBnAFRXizOU4QyAsjMAUCfrgeEI+RgAqK4MANRIBgDqZIQ405PeAlBdeQtAjWQAoG7EeETJpwBUV84AqJEMANSNGAGAMwCqq2XA1sRlGAAoOwMAdSNGADA9Qh5SCVuB5YnLMABQdgYA6saGCHlMi5CHVErq2wAGAMrOAEDdiDEDYACgOksZAIwA9yXMXxqXAYC6ESMA8Dhg1VnKJwFWAJsT5i+NywBA3XAGQIMu5QzAsoR5SxMyAFA3XAOgQZdyBsAAQEUYAKgbzgBo0N2bMO+lCfOWJmQAoG5siZCHAYDqLOUiPWcAVIQBgLoxFCEPFwGqzlYkzNsAQEUYAKgbMV4nIxHykEpJGQB4C0BFGACoGzFeJzFuI0ilGACocQwA1I0YtwBS76UupeQaADWOAYC6ESMAcAZAdbYyYd7OAKgIAwB1w1sAGnSbgTWJ8r49Ub7SThkAqBveApDSrAPYQPqDhqRxGQCoG84ASGkCgNvwCRkVYgCgbjgDIKVZCHhbgjylrhgAqBszIuThDIDqLtUMgFSEAYC6sUuEPFZHyEMqKUUAcGuCPKWuGACoG3Mi5LEqQh5SSc4AqFEMANSNuRHySPkctZRDiiD21gR5Sl0xAFA3nAGQ0uwD4AyAijEAUCdDwPwI+TgDoLpbGzm/TcBdkfOUumYAoE52Bab1mccILgJU/cV+Dd8ODEfOU+qaAYA62T1CHmtxHwDVX+xbANdGzk/qiQGAOokRADj9ryYwAFCj9Du1q2abBxwYIZ85wAcj5DPW2J3Z1gEbR/17KzsuPlxN2JRoY+v7h9kWoKxs/XtsPhLEvwVgAKCiDACaZxqwAFi4k48LCYP7bMIjfmM/n9X6GMtC4O0R88tlE+H2xQjbngFvBxBrWv+/gnCgy3pCsLGp9XF96+srW19bzbbAYkXr49rW5+4FXw/OAKhRDACqaxph+n13YLdxPt9j1NdGD/AxB+5BN4Nt2yDvlrCcdYRgYDUhIFjbw79XEgam0f92YVkaMQOAYeD6iPlJPTMAyG8X4GBgf2Bf4ABgH8JU+97AXoTBPcajd6qHOa20Z6T8RgcU4wUIY/+9tvW1doCxZlRKsftdXcUMAG4j/mOFUk8MANKYBxwDHAUc2kqHtT7uXbBeGgyxA4rVbAsIVrVS+98TBQ3tn1lLCDLaP7MhUp1KiBkAXBMxL2lSDAD6M0QY5E9opeOA4wnv8GMcoStVwTzi3Vraws6DhrWEGYz7Rn3enqloz2yMnsXI+S66vWg0xtNT3v9XcQYAvdkFOAk4FXhkKy0sWiOpXqaxbSFqLO11EevYNkOxrpVGL7hc3fq8/f8bCYHGxlE/u5FtgcimMeWMtL4eIxgyAFBxBgCdHQj8BfBs4ETsM6lqFrRSbO2nP9pPeawkPC0TgwGAinOaeny7AM8FXgQ8FjdMkhTXJWzba2L0XhS9aD+S2jZ2/4p24NL+3vVsW8exHrh3VNo8ifJVcwYA2zsAeD3wKpzalzQ4VgJLgbsJRxTfPipdh6cWNpIBQHA88A7Cu/7phesiSVWzAvgd8HvgCuDHwKKiNVLfBj0AeCDwHuDPcZpfknrxB+AC4PvAD3EDqtoZ1ABgL+B9wMvwHb8k9es24DPAZwm3EVQDgxYATAFeCXwA7/FLUmybgX8H3suOh3WpYgYpAHgQ8EngEaUrIkkNt4hwa/VnpSuiiQ3Cfe8phAV+v8LBX5JyOBD4EXBG6YpoYk2fATgI+B/gtNIVkaQBtAJ4MOHRQlXM1NIVSOhpwPnAkaUrIkkDahZhvdW3SldEO2riDMAQ8HeEVf6DcItDkqpsPSEI2NjpG5VX0wbIXYAvA2fRvLZJUh3NJpyaqopp0sE2uxE2pHChnyRVy6zSFdCOmhIA7EPYieqE0hWRJO3grtIV0I6asAbgMMJ2lAcXrockaUf3APsRjldWhdR9BuBAwqEUB5WuiBptBeHitZKw3/kqYOuoj+1jWdcQdkLr9XjXsce4ti1g+yB9JjBnzPfMZ/uneaYB88Z8z1y23/J6CrDrmO+ZzY7TtO6WqRjOwcG/kuo8A7AP8FPgiNIVUeWsIwzOq1sf7xv1ebdfB7cyHWu8AGRXtl9wO50QcIw2NgCZSghcxvv/0WUMEYKgfr5vBmFxcKfvUxobgWOBm0pXRDuq6wzAQsIz/g7+zbeKcE75MuDeMWnZqDT66z5ulMZGduzbpgRJowMF2H72Y6KAopfvG/1/YwOR8QKrboz9ubGBVbt+swgzPCVmdP4ZB//KquMMwHTCgr/TS1dEk7IFWAIsJpwatqT1cXEr3cX2g/nmMtWUGmkOITDZHdij9XF3YE9gb2Bf4ADCbdUD+yzrHOBFeExwZdUxAPgM8PLSldAO1hAOALmLbQP7Xa2P97S+trT1b+8HStW3O2Eb34e00kMJi647jRtLCHuxfAL/1iutbgHA24APla7EgBkhvDO/kzCgLyIM5ovGfG11qQpKymYBcAxwaCvtR5hVWE+4HlwOXIi34WqhTgHA6YTTpZp8fkEJy4DbgdtaH28l/CHfCdxBGOydhpekhqlLALAX8GtCtKne3Afc3Ep3E96xt/99I709riZJaog6PAUwBfg8Dv7j2cS2d+mjB/b2YH8L4ZE4SZK2U4cA4G+BJ5auRCGrCdPyt7D9NP1trXQ3LrKRJE1C1W8BHA1cRXMOkhgmLJi7qfVxGWGB3UrCu/m1hMUzt7fS8jLVlCQ1XZVnAKYC/029B//rgUsIK2OvBK7B1bGSJO3UWwnT23VKG4DvAC8B9o/eI5IkNdz+hPvfpQf0btNlwMvY8YAVSZLUgy9QflDvlLYQnk44MVEfSJI0UB5NWCxXeoCfKG0FPkfYElOSJEUwRFgwV3qQnyhdSNgbW5IkRfQcyg/y46X7gFdR/ccmJUmqnanAtZQf7MemHwL7JGy3JEkD7SWUH+xHp83A2/FdvyRJyUyhWu/+VwFPTdpiSZLEMyk/6LfT7cBRaZsrSZIAfk75gX+EcMCOj/dJkpTBoyk/8I8QjtA9KHFbJUlSyxcpP/jfAhySuqGSJCnYi3A6XsnBfwlwcOJ2SpKkUd5B2cF/E/DY1I2UJEnbDAE3UjYAeE3yVkqSpO2cQtnB/xPpmyhJksb6V8oN/lcC09M3UZIkjTYNuIcyg/8G4Pj0TZQkSWOdQbl3/+/M0D5JkjSOT+LUvyRJA2UIuJP8g/8m4OgM7ZMkSeM4iTLv/j+Wo3GSJGl87yf/4L8C2CNH4yRJ0vguI38A8LYsLZMkSeOaB2wm7+C/CJiTo3GSJGl8TyP/u/+XZ2mZJEma0EfJO/jfBczM0jJJkmpkSubyHpW5vI8TjhuWJEmFzCYMxrne/a8CFmRpmSRJNZNzBuChwIyM5X2G8PifJEkaI2cA8IiMZY0QThuUJEnjyBkAPCRjWRcBt2QsT5KkWskZAOQ8gvdzGcuSJEkTmEk4jCfH4r81wNw8zZIkqZ5yzQAcTb5jeL9CCAIkSdIEcgUAR2UqB+B/M5YlSVIt5QoAjshUzr3AJZnKkiSptnIFAA/MVM53gC2ZypIkqbZyBQCHZyrn25nKkSRJXVhM+tX/6/DYX0mSupJjBmAmsGeGcs4nBAGSJKmDHAHAfsBQhnJ+mKEMSZIaIUcAsH+GMgB+mqkcSZJqL0cAsG+GMpYA12UoR5KkRsgRAOS4/38RYSGgJEnqQo4AYPcMZTj9L0lSD3IEAAszlHFxhjIkSWqMHAHAbonzX4P3/yVJ6sm0DGXMS5z/r4GticuQJKWzO2HH2H0JT47tRdjYbR4wG9gIDLe+dwWwFFgG3AncBNyO28D3LEcAMDtx/lcmzl+SFM/hwMnAScBDgSPpf63YZuCPhPHgSuCy1kffHBb2E9JuAfzCfE2RJPVoAfAC4L+ARaTfFr6dVhDOh3kt+faj0RiXkfaXfHS+pkiSujAPeAnwA8L0fa5Bf6I0DPwC+BvC7QVlciVpDwCamq8pkqSdOIXwTn815Qf9idIm4FvAU8h3Iu7Aupx0v8jfZGyHJGlH04DnAb+k/ODea/oj8Dpgl+i9IiBMu6T65X05YzskSdtMAZ4L/IHyA3m/aSnwHmB+zA4SXEq6X9p7M7ZDkhQ8A7ie8gN37LQYeAMwPV5XDbafku6X9YKM7ZCkQXcs8CPKD9Sp03WENQLq04Wk+yU9NGM7JGlQTQfeTjVW9OdM3wUeEKH/Btb5pPvleL9GktJ6BM24zz/ZtIpwW2Co344cROeS5peyJGcjJGnATCW8699E+UG4CukC4IC+enQAfZc0v4xf5GyEJA2QfYCLKD/oVi0tB54z+W6tlhybIKxKlO9NifKVpEH2MMIz/Y8pXZEKWgh8FfgPYEbhuvQtRwCwNFG+BgCSFNeLgJ/hwrdOXkVY4L536Yr0I0cAcG+ifA0AJCmeNwKfowHvbDM5lbDV/YNLV2Sy6jwDcGuifCVp0HwUOBtXuvdqf8JaiTMK16OynkOaxRiH5WyEJDXUByi/uK7uaSPhPASN8VjSdLiHN0hSfz5C+cGzKWkr8Oreur/5jiN+R6/I2gJJap5/ovyg2bQ0TDhdsBamZShjWYI8706QpyQNivcB7yxdCWAdYd/9a4AbCIvGVwErWx9nEHZ8bad9gOMJbywPzl/djoaAfyXcEvhM4bpUwjRgM3GjrJ9kbYEkNcfzCO9US7xDXgacA7wQOJT+FqLPB04DPghcW6g9E6WthKOSRYjsYnbuOXmrL0mN8BBgLXkHw8XAhwhnCkxN2LbDgbcCN2Zu30RpHXBywvbWRuzzAD6et/qSVHt7A7eTbwC8grBhzuwcjRtlCvA0woZGpYOApfjEGh8nbqe+L2/1JanWZgCXkGfQOw84MU+zOno0cBllg4CrgV1TN7TK3kDcDn1L3upLUq19mPQD3VXAE3M1qAdDwEsIB/mUCgJ+SJ5F95X0ZOJ25svyVl+SauuRwBbSDW6rCVP9OXaW7cf+hIG4VBDwL+mbWE0PJG5HPitv9SWplmYSHrFLNaj9krD4ri6GgLcTVunnDgCGgWekb2L1TAM2Ea8jH5e3+pJUS6mm/rcA/0B9p7X/DNhA/iBgGXBAhvZVzvXE68SHZK67JNXNI0gz9b8eODNjO1J5HLCG/EHAeQzgoUtfIF4HHpK57pJUJ9OA3xN/8FpOWFnfFI8nBDS5g4BX5mhclbyReJ23MHPdJalOXkP8QesOwha8TfNM8q8JWMmA3Qp4BHE6bitpd5OSpDqbT9h9L+aAtYJmDv5t7yRvADACfDlLyypiJnEWXdyXu+KSVCPvIu5AtYlqPt8f0xDwv+QPAp6Qo3FVcTn9d9gt2WstSfUwn3CiXsxB6uVZW1DOTPLtlthO1zBAM9qfoP8O+132WktSPfwdcQeoj+atfnF7kP8woVdkaVkFvJg4EZMkaXszgLuINzD9lvCueNAcRzjJL1cAcAf5D0wq4lj676yrs9dakqrvRcQblDZTnQN9SngteWcB3pSnWWUdQf8d9avstZak6vsV8QakszPXvWqGgG+TLwBYRJjBabQT6b+jfpq91pJUbccTbzC6hwE/vrZlH8Ljj7mCgOyLLXOf3jQnQh7rIuQhSU3ykoh5/T1ho5pBdw/wnozlvYWGbxH8BPqPkr6RvdaSVF1TiLf479dU/1jfnFJtqTxRekyeZgW5f9ExVjo6AyBJ25wK7Bspr/cTjq1VsAV4d8by/ipjWbW8BbA+Qh6S1BTPjJTPdcC3IuXVJN8i39NnzwR2y1RWLQMAZwAkaZunRsrnX/Dd/3hGgA9lKmsG8OxMZdUyAHAGQJKCA4HDI+SzmgE7nKZHXyFssZzDn2cqh2m5CmqJsQbAAECp7UY48/yRhL0rDiDssT4ErCLs3HVjK11HeP56Q5GaatA9LlI+XyAEARrfJuDrwKsylHUaYUviZakLyh0AeAugnBnAQcAhhHcNe7S+vhBYQ3jedQVhULuWMNANklnA04AXAn/CzjfleNiYf28kBAE/Ab5GWDU8aKYDhwJHn5GehAAAHJlJREFUEv7O5xP6cBPhBM/VhNfWrYSFVYrjtEj5+O6/s3PIEwBMBZ5MOJ2wUT5A/49JvD57retpOmEg+xfgZ/R+FPONwCeBM2n2PtWzgL8lRNuxHuX5bSvPJm+mMoPw+voIob2b6K5vNhEWVP078HxCAKrJi/GI2j0M0Il0fZhGeGOU43HAL2VqU1Yfo/+OeWX2WtfLQ4HPAsuJ92JcTrjQH5axHakNAS8lbMGZ6o/4PuC9NGuQO4iwIGoxcfpoA2GV9Zn4/HmvdiHMpvT7O/hM7orX2HnkCQCW0cBNgT5N/x3z4uy1rofHAReT9kW5Cfg4224f1NVewHfI84c8QgigckwdprQHYX/4XmeSeknXE4Iy341252Ti9Hu2RWcN8Pfku24cnalN2Xye/jvledlrXW2HEN5B5XpRjgBLgafnaFwCTyfUP2d/tdMPgD3TNzG6pwNLyNdPVwCPyNKyeotxvPowYc97dedZ5Ps7aNxs9zfov1POzF7r6noxYc/uEoPZMGF9QZ2mbd8IbKVMf7XTIuAhqRsayRTgo5Tpp63A+3A2YGfeT//9fEP2WtdbzEOXOqVPZ2pTNjHunzw5e62rZxrhvl3JgaydvgzMTNvcvk0l3Loo3VfttIrMe35PwizCY0+l++onNGsNRUznEOfvV92bR77X/i8ytSmbGPeoYz33Wle7AOdS/sI8On2F6s4ETAE+R/k+GptWAQ9P2O5+TAG+Svk+aqdrCHsxaHsX0n/fviN7rettiHyziKtp2ELAy+m/U07NXuvqmAmcT/kL8njpIwnb3Y9/pXzfTJSWAQcna/nknU35vhmbrqf+i09ju5b++/UZ2Wtdf6vJ97p/QKY2ZXEN/XfI2E1YBsUQYbqu9IW4TheT91K+Tzqlywh7NlRFzkVOk+mrJu9J0asYe1ccn73W9Xcf+V7zjXrDewu+YCfrLZS/AHdKSwmP2FXBswgLFUv3STfprER90Ku9ibt/RIr0H8laXz/r6b8/52avdb0NEWfvhW7T8/M0K48Ym4fEOPiibh5K9zutlU5VuEAfQdjWuHRfdJs2Uo3X9Wcp3xfdpGynpVXYEP0HuGuy17r+diHva/3NeZqVR4x7Jwdlr3VZUwnPRZe+6HabtgDHJemJ7kwDfjdOvaqevpGiM3pwAuUfkew23Uk4a2CQzaL/frw1d6Ub4IHkfa2/L2Vjcq/cjnH/bnOEPOrk5YQZgLqYCry1YPmvpp63ic6k7M5fb6W6T3KMtR/wrtKVKKw9I9iPpTEqMmByz9TNy1xeMjOJExHVcSe1yZpBiNJLv+PqNW0E9o3fHR3NJ++OdbHTv8Xvkq7sR31uMbXTWqqz3qSUfm9znZO/yrX31+R9nSc9pyFnxB/jKGAIF6pB8efU85bHDMrsL/4S6h0gvpCdH0OcyvOo1pMI3ZhD2NlxkF3a58//OkotBkvu2djG7AOwH3EioliBRB1cQvl3WpNNv0rQH53EOBq1dPqT6L3S2WV91Ldkuouw5mNQvYDJ990W3FxpMm4i72v8U3malV6sxRN1e6cyWQ+kPo+xjZeGyftu/OGJ2pE7fSJ2x3SwkPos/hsv/Wn8LqmNKUx+c7Xcr7Mm2J/8r+//l7JBdbsFMEKIXAfBU6j39M8QcFrG8kq8c04h9yl4p1GfxX/jqeuplDEME/a7uLPHn/sV8Pb41Wm8pxQoM+mjmnULADYTgoBB8KTSFYjg5IxlPTFjWSkdT97Dleq+s2ZTAr/JWgScBFzU5fd/FXgCYRGlelPiJNp7U2aeMwDwEcDenFS6AhEclamcKVT3YJ1ezQAOy1heyUcPYziIMDU7yO4CTifcDvka4Yjw0ZYDX2x9z58R9mNRbxZS5iC6pAFAzgU0sWYABsH+NOPgkyMzlXMQYWOUptiXcNBLDjmDjVQeTO/T4E10bitB2NZ5F2ADIUBQf/6CMseeJ/3d1e0WwKA8AtiEizLkWwRYhW10Y9onY1lNCDRzzTTVyWLgZhz8Y3l5oXJvTJl53QKAQZkBaMoGJ7sSdgZMrQmD2Gg59wLYLWNZqQz6LQCldSpwYoFyt5J4u2bXAFTTwtIViGQKeW4zNW1viJxPf+QI0FJrSsCsaiq1tfkthF1Vk6nbDMCg3AJowkU5pxL35lLK+ajrcMayUhnkzYCU1lHA0wqVfUXqAuoWAAzKDMDW0hWIZCt5fmdNO9Z0ccaymtB3dd7HQNX2fsq9vpLvpuotgGpK+uhHRkvJ8w5zRYYycsp5SlsTToRr2u9f1XAK8OyC5TcqAPAWQPdyvgNM6Z5M5SzJVE4OI4T9xnNpwuNzy0tXQI0zBPwz5XZjXU3DAgBnALp3XekKRHJ9pnKupTk7RN7Gjhu5pNSE19otpSugxvkzwur/Un5MhvHOGYBqWk4znt+9JlM5K2nGO1mA32Qu7/eZy0sh16ZJGgwzgLMK1+GHOQqpWwAwKDMAAD8rXYEIfp6xrBLHD6dwQeby+j1TvrStwG9LV0KN8hbCaawlnZ+jEAOA6soSASa0EfhFxvJ+lLGslM7LXN711Hv25Ery3jJRsx0L/EPhOlxN2MUxOdcAVNf3qHd7LwTWZyyv7gEThHeyORcAtn2vQJmxNOH3rmqYBvwX5fcV+UKuguo2AzAoawAgPAnw/dKV6MOXMpd3C/DLzGXG9rlC5X6xULkxnFO6AmqMt1P+VNER8l87s/gtoXH9pM9nr3VZT6L/PiuRVgHzE/RHJ6+aZH2rkNZTbkvbKcANXdSxaqkJ62RUDUcT/gZLv6YvTt3Q0ep2C2CQZgAgLASp4yKtTxOCgNy+RH3vB/8n5fYzGAbOLlR2P/65dAXUCNOB/6UaR4o39k3uIvqPjv4je63LO51wgS4dmXabNgAHJemJ7rx3gnpVOW2kbJ9BODv+bsr3RbfpN5TbpEXN8lHKv55HgPsIf4eNtJT+O+gT2WtdDf9N+Rdnt6n0u7IFhD+k0v1Qpz5rewXl+6KbNAw8Nk0XaMA8leq8wfpQ4rYWtYb+O+hfste6GnYHbqf8C7RTuoswAJf2Osr3RbfpbsqslxjPVMJ+CqX7pFP6bKoO0EB5AOHcldKv5xHCCaCHpG1uWVvov5MaHSF18GBgHeVfqDtLT0nW+t5MISwQK90fndIw8KeJ+mCyjgLWUr5vJkp/BOYla70GxUzgcsq/ntvpq2mbW9YM4nTS+3NXvGKeR5xAKkX6WMJ2T8YRhAWBpftlZ+nDyVrfn5dTvm/GS/cCxyRstwbHxyn/em6nYcIbvMaaT5yOenfuilfQiwnbn5Z+0Y5O5xE20aiap1O9vmqnCwirj6vqQ5Tvo9FpLfCopC3WoHgR5V/Po9PX0ja3vL2J01HvzF3xino64bjI0i/cEeASqnMPezzvoHwfjU1XUv1p7CnAJynfVyOEBcSPTNtcDYiHUq1bqVuBE5K2uAIOIk5n/W3uilfYgwj7uJd88Z5HPR5beTfl/9Db6XJgz7TNjWaI8jMB1xBu50j92he4g/LXgNFpIHayPIo4nfXG3BWvuNnAR8i/LmAY+CfCqvG6eCvl10+cC8xN3dAEngmsIH9//Q/1CDBVfbOp3hMu64FDUza6Kh5MnA57Q+6K18RxwHfI86K9HnhcnmZFdwawnPx/6FsJiySrfM+/k8MJB+/k6K9fAqfkaZYGxOcpP+CPTe9L2uIKeSRxOuy1uSteMw8nnGaV4h7XHcCbCU901NlB5AuWRggB02lZWpbHs4Bfk6avLiLMNrjDn2L6O8oP9mPTbcQ5IK8WHkecTnt17orX1ELgJcDX6W+x4CbCtPWLqf/AP9YzgWtJ9we+lDBjVed3/TvzRMIpgqvor5+uI9xOavxCKBXxXKr5JNCzUza6ap5CnE57Re6KN8B04CHAKwmrus8lLKwae+FeClwN/AA4C3gGIZBosimEJyouIAQ7MV6jVwIvoxoHi+QwC3gy8B7C8dU3Mf4M1GbCkc0XEW6H/AVwWPbaapCcQjVO+Bubvpey0VX0bOJ03EtzV1wDYy5hV76PEB5tXEZ3r8k7CQPfG3BAG20eIYBspzotGFX9HQIspvxgPzatAA5I2O6e5Nq8JcZRwBCmcqQU1hBmP34w6mt7ERa/zSPsdbCAsLvgqtbH6wmLCrWj1aUroIE1n7DOZ6/SFRnHmwjrqSrBAECa2JJWklQPM4BvEZ6MqprzCCe7VsaUTOXEuh9qACBJGs8Q8Cng9NIVGcdSwhkblZIrAHAGQJKU0nuAvyxdiXGMEAb/u0pXZCwDAElS3f058K7SlZjA/wW+W7oS48kVAMyMlM9wpHwkSc3weOBzVHMDqV8Cf1+6EhOpWwCwJVI+kqT6O4ZwnG4VN9xaTNiIaHPpikykbgGAtwAkSRBO9/sB4fHcqtkMPA9YVLoiO5MrAIi1jawBgCRpDvBNwtkeVfQ3wE9LV6ITAwBJUp1MBb4MnFy6IhP4T+DfSleiG3ULAFwEKEmD7WzgqaUrMYGLgL8qXYlu1W0NwEikfCRJ9fNG4PWlKzGBq4EzCQeL1ULdAgBJ0mB6IuGZ+iq6mzArsbJ0RXpRt1sAzgBI0uA5gnDfP9f5Nb1YSThJ9LbSFelV3QIASdJgmQ98g3CsdNWsB54O/KZ0RSbDWwCSpKqaApwDHFu6IuPYCrwQuLh0RaruSsL0fb/ptNwVlyQV84/EGTtip63AixK2u1GuxgBAktS9xxO2fy892I9Nw8CrE7a7cf5InI5/dO6KS5KyOwBYQvnBfrzB/zUJ291It2IAIEnqbBrhvnrpwX68wb82m/xUyd0YAEiSOvsA5Qf78Qb/V6VsdJPdS5xfwqNyV1ySlM3Dqd59/2HgtSkb3XRrMACQJE1sGnAV5Qf8sYP/61I2ehBswgBAkjSxl1N+wB+dtuKCv74NEe8XcmrmukuS0ptKvKfFYqQtwEtSNnhQzMQAQJI0sedSftBvpw3AM9I2txpyHKywR4YyJEn19dLSFWhZCzwLOL90RZriUcSLzI7KXHdJUlr7AJsp/85/OfDIxG2tlBwzAAdHzOvOiHlJksp7MuWP+V0CnEFNT/WbrBydfkikfFa3kiSpOR5fuPxFwBOBPxSuR3Y5jgM+KFI+d0TKR5JUHSUPebuOsLh84AZ/yBMAHBwpH6f/JalZdgMOLFT2FcBjCDMAA6lOMwBLIuUjSaqGEwqVez5wOrC0UPmVkCMA2CdSPssj5SNJqoZDC5T5TcJz/msKlF0pqQOAmcDcSHndFykfSVI17J+5vH8HnkPY7GfgpQ4A9oyYlwGAJDXL3hnLei/hYJ/hjGVWWurHAA0AJEkT2SVDGVuB1wOfzFBWraSeAdg9Yl4rI+YlSSpvToYy3oqD/7hSBwB7RcxrfcS8JEnlTU2c/8XARxOXUVupA4CFEfPaGDEvSVJ5mxLn//eJ86+11AHA7Ih5uWpTkpol5XX9GuDShPnXngGAJKmUZQnz/n7CvBshdQAwK2Je3gKQpGa5J2HeFyTMuxHqNAPgs5uS1CypAoDNOP3fUZ0CgNLnRUuS4ro7Ub634pNjHdXpFoABgCQ1S6oZgBsS5dsoqQOAmIO2AYAkNcstwJYE+RoAdCF1ABDzF5t6wwhJUl4bSDNYp7q10Ch1CgBmRMxLklQNv0uQ59IEeTZOnQKAWMcKS5Kq4/cJ8ky5v0Bj1CkA2DViXpKkajAAKMQAQJJU0uUJ8rw3QZ6NkzoA2BoxLwMASWqeu4EbI+e5JHJ+jZQ6AFgbMS8DAElqposj5rUFWBkxv8ZKHQDcFzGvPSLmJUmqjksi5nUPbh3fldQBwIqIeR0QMS9JUnXEnAFIecBQo9RpBsAAQJKa6Wbgpkh53Rkpn8YzAJAkVcG5kfK5OlI+jVenWwC7AbtEzE+SVB0/iJRPip0FNQkHAiMR05F5qy9JymQ24ckxx4lMUs8ALCbuaswjIuYlSaqO9cCP+8xjJZ4E2LXUAcAm4q7IPCZiXpKkavlynz//NXwEsFJ+TrxbAP+dt+qSpIxmEnYFnMz4sAHfJPYk9QwAwK0R8/KXK0nNtRF4JWH2uFfvAK6NWx316wPEmwFYDQzlrb4kKbNnA2voblzYDLy9TDXVyWuI+yTA4XmrL0kq4Cjgm4RD5SYaDy4ATi5VwbqblqGMWyPn90hc5SlJTXc98ExgX+AMwi3gXQkzwX8AfkT88UWRPYC4MwCfzFt9SZI0WcuJFwC4y5MkSTXxU+IFAFsJ00CSJGmScjwGCPD7iHlNIawDkCRJk5QrAIg9bf/kyPlJkqQEHkHchYA3562+JEmajF0ImzXEDAKOztoCSZIaJNctgLXAVZHzfGrk/CRJGhi5AgAITwLEZAAgSVINPIW4twC2EjYZkiRJPco5A3ApYdCOZQrw4oj5SZKkRK4g/tMAng4oSVKPcs4AQPx1AIcAj46cpyRJjZc7ADgvQZ4vS5CnJEmKaDpwL3FvA2wA9svZCEmS6m5q5vKGgWOBB0XMcxohEPhRxDwlSVJkZxJ3BmAEWAPsnrMRkiSpN7MJA3bsIODdORshSZJ691XiBwDLgHk5GyFJUl3lXgPQNgV4TuQ85xDWA7gWQJKkipoBLCH+LMBG4KiM7ZAkST36MPEDAJ8GkCSp4g4jPBaYIgh4RsZ2SJKkHl1AmgDgVmBBvmZIkqRePJc0AcAI8LWM7ZAkST2YDtxNuiDglfmaIkmSevFW0gUA64ET8jVFkiR1axdgMemCgN/hBkGSJFXS35IuABgBLgRmZmuNJEnqyhzgHtIGAV8k7EAoSdLAK7UV8FibWx+flLCM44A9gR8kLEOSJPVoDmmfCGin/5OrQZIkVVVVZgAgzAKsAJ6euJzHEY4k/nHiciRJqqyh0hUYYwrwS+BhGcr6DPBatt1+kCRVwzTgYOBw4IGEp8UWEBZzbwS2AqsIa8dubaXb8ldTsT2S8MtNfSug/XTAbnmaJUnaiRMIt2h/BKyl9+v5UuA7wNsIQYNq6t/IEwCMADeRZ8ZBkrS9ucCbgN8S/9p+BfA6wvoy1ch84HbyBQEbgb/BxwQlKYc5wLuAZaS/vi8B3gnMytIyRfFk0h0XPFH6KU4dSVJKTwFuIe+1fQT4I/CEDO1TJJ8g/4tkLfBR4OgM7ZNiW9hjknKZBnyQ/Nf00WkY+FirLgOvak8BjDUbuBw4tlD5lwKfAr4KbChUB1XPQsJJlnMJq5NnEFYoz9jJ16YAu7Z+fibb7kvObeU11Pp+Wj+zy5j/H2tX0t+yaq+0hvC0zJrW55sIgTKEv4v1rc/Xt/69Bljd+tnVhMd7V4362irg3lZq/6yabQ/ge8DJpSvS8kPgWcC60hUpqeoBAMDxwC/YdkEsYQVwHuEFfB7hwqVqW0g4BGp0WsC2wXm8Qbzbryme9YS/p+WjPi4jrOheAtxJeNTrrtZHA/H62Qc4n3Atr5JLgT8lBKYDqQ4BAMDzCXv5V8FWQkDyA+DnwJVse2ek/sxh22C9ayuNHsDnEwbxueN8bexgr2ZaTtgxdHRqBwftj3cy4O/sKmQh8DOqe0v1POCphOv6wKlLAADwEeDNpSsxjq3AtcCvCJsYXQ3cQHgX0yTtKez2oDyf7Qfg+a00g7Dadnbr5yb6fDbbvzOfT7V2plS9rSYEAncRFpzdAtw86uOSclUbGDMIz/SfVroiHXyYsHfAwKlTADAV+BYhWquD5YRA4I+EvQYWE96tLGl9XEye+59TCYPrHMK95/Y76F3HSQtaaezX5rV+RmqKtWwfEIz96NqE/n2YcNR71Y0QDqK7oHRFcqtTAADhHuxFNGfjnvWEC1F7YdTa1tdWA1tGfV97MVb7XvRoYwf4hWxbRDYPV7tKk3EP2wKCWwjB/LXA9XjLrxunEwbUuuytciNhJ8KBCvzqFgBAWFByCT6vLym/EcImZdcB1xACgmta/15RsF5VMg34DeWe3pqsNxMeAR8YdQwAAA4kbNpzSOmKSFLLfYRZgmtGfbyGcMtvkLwROLt0JSZhMXAoA7SAtK4BAIQZgJ8C+5WuiCTtxDK2zRL8gjA1flfRGqUzk3DrpK7X5ZcC/126ErnUOQAAOIywytSZAEl1sRn4PGHledOeFnoF8OnSlejDz4BHla5ELnUPAAD2JwQBVX3OVJLGcztwBmEdQVNcRnV2+5uMEeAAmjtDs526rNDcmTsJz5leWroiktSDBwDfpzlnMhxBvQd/CG+Kn1i6Erk0IQCAMI32BMK0miTVxaHAu0tXIpKnla5AJI8pXYFcmhIAAGwEXkw493kgt3WUVEuvpBkbbTXlqN2qnVmQTBPWAIznscA5wL6F6yFJ3XgW8M3SlejDEGEfhPmlKxLBOsoePpdNk2YARrsIeAhhcaAkVd2JpSvQp4NoxuAPYVfVprRlp5oaAEDYyvMM4NW4daekatu9dAX6dGTpCkS2Z+kK5NDkAADCIx2fIkTX5xauiyRNpO7rlpp2u3VG6Qrk0PQAoO0m4E+BUxjAE58kVd4tpSvQpz1KV0C9G5QAoO0XhGc8TwV+XLguktR2cekK9Gl66QpENhDnAQxaAND2c8IjK6cCXwQ2la2OpAF2HfDr0pXoU5OeKBshHAzUeIMaALT9HHgBYUeu/wPcUbY6kgbQ+wiDTp01aaH1MmBD6UrkMOgBQNti4B8Jhwo9HfgCsLpojSQNgi8DXypdiQiWlK5ARL8vXYFcDAC2twX4LvBCYC/C5hxfAtaWrJSkRvoiYffSJlhUugIR/bZ0BXJp0n2blGYTjoh8ImHtwInYd5Im55fAh4Gvl65IRLsC99GM6+KZwLdLVyKHJvyyStgLeDwhKDgJeBDNWwUraUfrCPeHV7Q+rh/1+TpgJeFckjWE24gbWh/XEDYnu57mHjV7E+FwozrbTHikcVXpiuRgABDHTODBwMOBhwLHAkfRjAM+pLoZPfCubX2+kskP3qPz0MQ+DbyidCX6dB7w5NKVyMUAIJ0hwtMFRxECgkMJ+2W300DsNS2NYyNhwF3d+nwVYTBuD84bCYPumtbn7cF7I2GaebzBe1Xr8yatRq+b5wBfLV2JPr2AsDZjIBgAlLMAOBDYj3BLYU/Cdpp7EfYFn0eYQVhACBbmArOK1FSDZvRgu4kwGE80WG8iDLprWp+Pfne9svW19rvoTa081UyzgbsJ6wHqaBnhTdv60hXJZVrpCgywFa3UyyMn0wmBwEK2BQizW/+G8Ic3pfX16a3/m0W4RTGH8PueN+rf7f9vf/98YOqo/FQdawj3J9uDc3uQbQ/QWwgD7VbCID1MGIDbg/Xo6e21rc9HD9arWl/z8VdN1nrgK8ArS1dkks5mgAZ/cAZAE5tCmH3YbVRaOObfo9NMtgUQY01l4lseswiBSGrtgbKTVWw7mKU9eI79+fYg2zb6Xe3on2+/64VtA+3ovDYTBuR2fiOEQZnWx5Ex+UlVdxRwNeNfB6rsXuAwXOchVcZ8QtDRKbmfhVQd5xCC1zqlVyfpCUmSBshBhJmt0oN6t+kyBvRNRN2maSRJ1dZe/Pmk0hXpwirgDGB56YpIktQEU4BzKf/ufmdpGHhuqg6QJGlQ7Q7cSPmBfqL0tnRNlyRpsB1COCio9GA/Nn0gZaMlSRIcQXVmAoaBt6RtriRJatsDuJiyg/9y4OmpGypJkrY3DXgnYcfJ3IP/hYTHEyVJUiHHAN8hz8C/CHh+nmZJkqRunEI4PXAT8Qf+PwAvB2Zka40kSerJPsCbCdP0/QQDi4CPEwILz7npgp0kSaqK+cDJwInAg4CDgb0Jx6ZPJ2wxvAFYCtwM3AL8Brik9bl68P8BkRD3Fh8j3MoAAAAASUVORK5CYII="
              />
            </defs>
          </svg>
        </div>

        <h2 class="my-8 text-center mainHeader">
          Forgot Password
        </h2>
      </div>

      <div class="sm:mx-auto sm:w-full sm:max-w-md mainHeaderDiv grid  mb-2">
        <span class=" text-center spartan text-sm sm:text-xs  items-center">
          Please enter your email address for us to send your password reset
          link to get you back to your account
        </span>
        <!-- <span class="mt-1 text-center spartan text-sm sm:text-xs items-center"
          >reset link to get you back to your account</span
        > -->
      </div>

      <validation-observer
        ref="observer"
        tag="form"
        role="form"
        v-slot="{ invalid }"
        class="space-y-6 sm:mx-auto sm:w-full sm:max-w-md"
        @submit.prevent="sendPassword"
        novalidate
      >
        <div>
          <label
            for="email"
            style="font-family: 'Spartan', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 100%;
                    color: #797979;"
            class="block text-sm font-medium"
          >
            Email address
          </label>
          <div class="mt-1">
            <validation-provider rules="email_required" v-slot="{ invalid }">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="email"
                autocomplete="email"
                v-model="userEmail.email"
                required
                :disabled="sendUserPassword.loading"
                v-bind:class="{ 'invalid-field': invalid }"
                class="spartan text-base appearance-none block w-full px-3 py-2  placeholder-gray-400 focus:bg-gray-50 focus:outline-none sm:text-sm"
              />
            </validation-provider>
          </div>
        </div>

        <div>
          <button
            type="submit"
            style="background-color: #4691A6;"
            :class="invalid && 'opacity-25'"
            :disabled="invalid"
            class="buttonText w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Password Reset Link
            <i
              class="ml-px fa fa-spinner fa-spin"
              v-if="sendUserPassword.loading"
            ></i>
          </button>
        </div>
      </validation-observer>
      <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md grid grid-rows-1 mb-4">
        <span class="text-center spartan text-base sm:text-sm items-center">
          I remember my password,
          <router-link :to="'/login'">take me back to login</router-link>
        </span>
      </div>
    </div>

    <YouGotMail v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ApiResource from "@/components/core/ApiResource";
import EmailService from "../../components/mail/Mail";
import { Log, Util } from "../../components/util";
import YouGotMail from "./YouGotMail.vue";

@Component({
  name: "Forgot_Password",
  components: {
    YouGotMail,
  },
})
export default class ForgotPassword extends Vue {
  private sendUserPassword: ApiResource = ApiResource.create();

  private userEmail: any = {
    email: "",
  };

  private emailSent = false;

  private sendPassword() {
    this.sendUserPassword.loading = true;

    Log.info("userEmail: " + this.userEmail);

    EmailService.sendPassword(
      this.userEmail,
      (response: any) => {
        this.sendUserPassword.loading = false;
        this.emailSent = true;
        Util.handleGlobalAlert(true, "success", "Password sent to email");
      },
      (error: any) => {
        this.sendUserPassword.loading = false;
        Util.handleGlobalAlert(true, "failed", "Password not sent to email");
      }
    );
  }
}
</script>

<style scoped>
input {
  position: relative;
  width: 100%;
  height: 48px;
  /* left: 520px; */
  /* top: 245px; */

  border: 2px solid #2c5662;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0 24px;
}
</style>