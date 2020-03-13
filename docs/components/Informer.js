import React from 'react'
import {withStyles, fontFamily} from 'docs/utils/theming'
import H3 from 'docs/components/H3'

const styles = theme => ({
  root: {
    display: 'none',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginLeft: 30,
    marginRight: 30,
    paddingBottom: 20,
    fontFamily: fontFamily.CorsicaRamblerLX,
    '& section': {
      flex: 1
    },
    '@media screen and (min-width: 768px)': {
      flexDirection: 'row',
      maxWidth: 980,
      marginLeft: 100,
      marginRight: 100,
      paddingBottom: 40,
      '& section + section': {
        marginLeft: 10
      },
      '& section:last-child': {
        flexBasis: '100%',
        marginLeft: 0
      }
    },
    '@media screen and (min-width: 1024px)': {
      '& section:last-child': {
        flexBasis: 0,
        marginLeft: 10
      }
    },
    '& h3': {
      marginTop: 40,
      '& a': {
        color: theme.colors.black,
        transitionDuration: 200,
        transitionProperty: 'color',
        '&:hover': {
          color: theme.colors.blue
        }
      }
    },
    '& h3 + p': {
      marginTop: 25,
      marginBottom: 0,
      '& a': {
        color: theme.colors.black,
        transitionDuration: 200,
        transitionProperty: 'color',
        '&:hover': {
          color: '#62687f'
        }
      }
    }
  }
})

const Informer = ({classes}) => (
  <footer className={classes.root}>
    <section>
      <H3>
        <a
          href="https://rambler-co.ru"
          target="_blank"
          rel="noreferrer noopener">
          О Рамблере
        </a>
      </H3>
      <p>
        <a
          href="https://rambler-co.ru"
          target="_blank"
          rel="noreferrer noopener">
          Рамблер — это медиа и сервисы с аудиторией более 50 миллионов
          пользователей по всей России.
        </a>
      </p>
    </section>
    <section>
      <H3>
        <a
          href="https://rambler-co.ru/jobs"
          target="_blank"
          rel="noreferrer noopener">
          Вакансии
        </a>
      </H3>
      <p>
        <a
          href="https://rambler-co.ru/jobs"
          target="_blank"
          rel="noreferrer noopener">
          В Рамблере вас ждут большая команда, уютный офис, комфортная атмосфера
          и, конечно, амбициозные задачи.
        </a>
      </p>
    </section>
    <section>
      <H3>
        <a
          href="https://rambler-co.ru"
          target="_blank"
          rel="noreferrer noopener">
          Rambler&Co
        </a>
      </H3>
      <p>
        <a
          href="https://rambler-co.ru"
          target="_blank"
          rel="noreferrer noopener">
          В группу компаний Rambler&Co входят Афиша, Championat.com, Лента.ру,
          Газета.ру, Касса и другие известные проекты.
        </a>
      </p>
    </section>
  </footer>
)

export default withStyles(styles)(Informer)
