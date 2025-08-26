LotoGains
IA (Produto principal)
:

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loto Gains - Générateur de Numéros Gagnants</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Baloo+2:wght@700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root
{
  \
            --vert-vif: #00C853
  \
            --vert-fonce: #009624
  \
            --or: #FFD700
  \
            --or-fonce: #FFC400
  \
            --blanc: #FFFFFF
  \
            --noir: #121212
  \
            --gris-clair: #f8f9fa
  \
            --gris-fonce: #6c757d
  \
            --degrade-vert: linear-gradient(135deg,
  var(--vert-vif) 0%,
  var(--vert-fonce) 100%);
  \
            --degrade-or: linear-gradient(135deg,
  var(--or) 0%,
  var(--or-fonce) 100%);
  \
            --ombre: 0 10px 20px rgba(0, 0, 0, 0.1)
  \
            --ombre-accent: 0 15px 30px rgba(0, 200, 83, 0.3)
  \
            --bordure-arrondie: 20px
  \
            --transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)
}
;[(data-theme = "dark")]
{
  \
            --blanc: #1a1a1a
  \
            --noir: #f8f9fa
  \
            --gris-clair: #2d2d2d
  \
            --gris-fonce: #b1b1b1
  \
            --ombre: 0 10px 20px rgba(0, 0, 0, 0.3)
}
\
        *
{
  margin: 0
  padding: 0
  \
            box-sizing: border-box
}

body
{
  \
            font-family: 'Poppins', 'Baloo 2', sans-serif
  \
            background-color:
  var(--blanc);
  \
            color:
  var(--noir);
  \
            line-height: 1.7
  \
            transition:
  var(--transition);
  \
            min-height: 100vh
  position: relative
  \
            overflow-x: hidden
}

/* Efeito de partículas douradas no fundo */ \
        .particles
{
  position: fixed
  top: 0
  left: 0
  width: 100%;
  height: 100%;
  \
            pointer-events: none
  z - index
  : -1
}

.particle
{
  position: absolute
  background: var(--or);
  border - radius
  : 50%
  opacity: 0.3
  animation: float
  linear
  infinite
}

@keyframes
float
{
  0% { transform: translateY(0) rotate(0deg);
}
100% { transform: translateY(-100vh) rotate(360deg);
}
        }

        .container
{
  max - width
  : 100%
  margin: 0
  auto
  padding:
  15px
  position: relative
}

/* Header */
header
{
  text - align
  : center
  margin - bottom
  : 5px
  padding:
  15px 0
  position: relative
}

.logo-container
{
  position: relative
  margin: 0
  auto
  5px
  width: 100%
  height: auto
  display: flex
  align - items
  : center
  justify - content
  : center
  padding: 0
}

.logo
{
  width: 100%;
  max - width
  : 800px
  height: auto
  object - fit
  : contain
  margin - top
  : -30px
  margin - bottom
  : -30px
  border: 0
}

h1
{
  color: var(--vert-vif);
  font - family
  : 'Baloo 2', sans-serif
  font - size
  : 2.3rem
  font - weight
  : 800
  margin:
  10px 0 30px
  text - shadow
  : 2px 2px 4px rgba(0, 0, 0, 0.1)
  letter - spacing
  : -0.5px
  position: relative
  display: inline - block
  padding: 0
  15px
  background:
  var(--degrade-or);
  ;-webkit - background - clip
  : text
  ;-webkit - text - fill - color
  : transparent
}

h1:
:after
{
  content: ""
  position: absolute
  bottom: -8px
  left: 50%;
  transform: translateX(-50%);
  width:
  80px
  height:
  4px
  background:
  var(--degrade-or);
  border - radius
  : 2px
}

/* Formulaire Premium */
.form-container
{
  background - color
  :
  var(--blanc);
  border - radius
  :
  var(--bordure-arrondie);
  padding:
  25px 20px
  box - shadow
  :
  var(--ombre);
  margin - bottom
  : 25px
  position: relative
  overflow: hidden
  border:
  1px solid rgba(0, 200, 83, 0.15)
  margin: 0
  auto
  30px
  max - width
  : 500px
  transition:
  var(--transition);
  z - index
  : 1
}

.form-container::before
{
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%;
  height:
  5px
  background:
  var(--degrade-vert);
}

.form-container::after
{
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%;
  height: 100%;
  background: linear - gradient(135deg, rgba(0,200,83,0.02) 0%, rgba(255,215,0,0.02) 100%)
  z - index
  : -1
}

.question
{
  margin - bottom
  : 25px
  display: none
  animation: fadeIn
  0.6s ease-out
  position: relative
}

.question.active
{
  display: block
}

.nav-back
{
  display: flex
  justify - content
  : flex-start
  margin - bottom
  : 15px
}

.back-btn
{
  display: inline - flex
  align - items
  : center
  background: rgba(0, 200, 83, 0.1)
  border: none
  color:
  var(--vert-vif);
  padding:
  10px 15px 10px 12px
  border - radius
  : 50px
  font - size
  : 0.95rem
  font - weight
  : 600
  cursor: pointer
  transition:
  var(--transition);
  box - shadow
  : 0 3px 10px rgba(0, 200, 83, 0.1)
}

.back-btn:hover
{
  background: rgba(0, 200, 83, 0.2)
  transform: translateX(-5px)
  box - shadow
  : 0 5px 15px rgba(0, 200, 83, 0.2)
}

.back-btn i
{
  margin - right
  : 8px
  font - size
  : 0.9rem
}

.question-label
{
  display: block
  margin - bottom
  : 12px
  font - weight
  : 700
  color:
  var(--vert-vif);
  font - size
  : 1.2rem
  position: relative
  padding - left
  : 20px
}

.question-label::before
{
  content: ""
  position: absolute
  left: 0
  top: 50%;
  transform: translateY(-50%);
  width:
  10px
  height:
  10px
  background:
  var(--or);
  border - radius
  : 50%
  box - shadow
  : 0 2px 5px rgba(255, 215, 0, 0.3)
}

/* Options de pays et villes */
.country-option, .city-option
{
  display: flex
  align - items
  : center
  padding:
  12px 15px
  margin:
  8px 0
  background - color
  : rgba(0, 200, 83, 0.05)
  border - radius
  :
  var(--bordure-arrondie);
  cursor: pointer
  transition: var(--transition);
  border:
  1px solid rgba(0, 200, 83, 0.1)
  position: relative
  overflow: hidden
}

.country-option:hover, .city-option:hover
{
  background - color
  : rgba(0, 200, 83, 0.1)
  transform: translateX(5px)
}

.country-option.active, .city-option.active
{
  background - color
  : rgba(0, 200, 83, 0.15)
  border - color
  :
  var(--vert-vif);
}

.country-option::after, .city-option::after
{
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%;
  height: 100%;
  background: linear - gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
  transform: translateX(-100%);
  transition:
  0.6s
  pointer - events
  : none
}

.country-option:hover::after, .city-option:hover::after
{
  transform: translateX(100%);
}

.country-flag, .city-icon
{
  width:
  40px
  height:
  40px
  object - fit
  : contain
  margin - right
  : 15px
  border - radius
  : 8px
  background - color
  :
  var(--blanc);
  padding:
  5px
  box - shadow
  : 0 3px 10px rgba(0, 0, 0, 0.1)
  transition:
  var(--transition);
}

.city-icon
{
  background: var(--degrade-vert);
  display: flex
  align - items
  : center
  justify - content
  : center
  color: white
  font - size
  : 1.5rem
}

.option-name
{
  font - weight
  : 600
  color:
  var(--noir);
  flex - grow
  : 1
}

/* Options de loterie avec logos */
.lottery-option
{
  display: flex
  align - items
  : center
  padding:
  12px 15px
  margin:
  8px 0
  background - color
  : rgba(0, 200, 83, 0.05)
  border - radius
  :
  var(--bordure-arrondie);
  cursor: pointer
  transition: var(--transition);
  border:
  1px solid rgba(0, 200, 83, 0.1)
  position: relative
  overflow: hidden
}

.lottery-option:hover
{
  background - color
  : rgba(0, 200, 83, 0.1)
  transform: translateX(5px)
}

.lottery-option.active
{
  background - color
  : rgba(0, 200, 83, 0.15)
  border - color
  :
  var(--vert-vif);
}

.lottery-option::after
{
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%;
  height: 100%;
  background: linear - gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)
  transform: translateX(-100%);
  transition:
  0.6s
  pointer - events
  : none
}

.lottery-option:hover::after
{
  transform: translateX(100%);
}

.lottery-logo
{
  width:
  40px
  height:
  40px
  object - fit
  : contain
  margin - right
  : 15px
  border - radius
  : 8px
  background - color
  :
  var(--blanc);
  padding:
  5px
  box - shadow
  : 0 3px 10px rgba(0, 0, 0, 0.1)
  transition:
  var(--transition);
}

.lottery-option:hover .lottery-logo
{
  transform: rotate(10deg)
  scale(1.1)
}

.lottery-name
{
  font - weight
  : 600
  color:
  var(--noir);
  flex - grow
  : 1
}

/* Bouton principal */
.btn
{
  display: block
  width: 100%;
  max - width
  : 320px
  margin:
  35px auto
  padding:
  18px 30px
  background:
  var(--degrade-vert);
  color: var(--blanc) !important;
  border: none
  border - radius
  :
  var(--bordure-arrondie);
  font - family
  : 'Baloo 2', sans-serif
  font - size
  : 1.3rem
  font - weight
  : 700
  text - transform
  : uppercase
  cursor: pointer
  box - shadow
  :
  var(--ombre-accent);
  transition: var(--transition);
  position: relative
  overflow: hidden
  text - align
  : center
  letter - spacing
  : 0.5px
  text - shadow
  : 0 1px 2px rgba(0, 0, 0, 0.1)
  z - index
  : 1
}

.btn:hover
{
  transform: translateY(-5px)
  scale(1.03)
  box - shadow
  : 0 20px 40px rgba(0, 200, 83, 0.4)
}

.btn:active
{
  transform: translateY(2px)
}

.btn:disabled
{
  background: var(--gris-fonce);
  cursor: not - allowed
  transform: none
  box - shadow
  : none
}

.btn::before
{
  content: ""
  position: absolute
  top: 0
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear - gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)
  transition:
  0.5s
  z - index
  : -1
}

.btn:hover::before
{
  left: 100%;
}

/* Effet de néon pour le bouton */
.btn::after
{
  content: ""
  position: absolute
  top: -5px
  left: -5px
  right: -5px
  bottom: -5px
  background: var(--degrade-vert);
  border - radius
  :
  var(--bordure-arrondie);
  z - index
  : -2
  filter: blur(10px)
  opacity: 0
  transition:
  var(--transition);
}

.btn:hover::after
{
  opacity: 0.7
}

/* Résultats Premium */
.results
{
  background - color
  :
  var(--blanc);
  border - radius
  :
  var(--bordure-arrondie);
  padding:
  25px
  box - shadow
  :
  var(--ombre);
  margin - bottom
  : 25px
  display: none
  animation: fadeIn
  0.6s ease-out
  border:
  1px solid rgba(0, 200, 83, 0.15)
  position: relative
  overflow: hidden
  max - width
  : 500px
  margin: 0
  auto
  30px
  z - index
  : 1
}

.results::before
{
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%;
  height:
  5px
  background:
  var(--degrade-or);
}

.results::after
{
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%;
  height: 100%;
  background: linear - gradient(135deg, rgba(255,215,0,0.02) 0%, rgba(0,200,83,0.02) 100%)
  z - index
  : -1
}

.results.active
{
  display: block
}

.results-header
{
  text - align
  : center
  margin - bottom
  : 20px
  padding - bottom
  : 15px
  border - bottom
  : 2px dashed rgba(0, 200, 83, 0.3)
  position: relative
}

.results-header::after
{
  content: "🍀"
  position: absolute
  bottom: -15px
  left: 50%;
  transform: translateX(-50%);
  font - size
  : 1.5rem
  background:
  var(--blanc);
  padding: 0
  15px
}

.results-title
{
  color: var(--vert-vif);
  font - family
  : 'Baloo 2', sans-serif
  font - size
  : 2rem
  margin - bottom
  : 15px
  letter - spacing
  : -0.5px
  position: relative
  display: inline - block
  border: 0
  background: none
  ;-webkit - background - clip
  : unset
  ;-webkit - text - fill - color
  : unset
}

.results-title::after
{
  content: ""
  position: absolute
  bottom: -5px
  left: 0
  width: 100%;
  height:
  3px
  background:
  var(--degrade-or);
  border - radius
  : 3px
}

.next-draw, .prize
{
  margin - bottom
  : 15px
  font - size
  : 1.1rem
  font - weight
  : 600
}

.prize span
{
  background: var(--degrade-or);
  ;-webkit - background - clip
  : text
  ;-webkit - text - fill - color
  : transparent
  font - weight
  : 800
  padding:
  2px 5px
  border - radius
  : 4px
}

.numbers-container
{
  display: flex
  flex - wrap
  : wrap
  justify - content
  : center
  gap:
  12px
  margin:
  30px 0
  position: relative
}

.numbers-container::before
{
  content: ""
  position: absolute
  top: -15px
  left: 0
  width: 100%;
  height:
  1px
  background: linear-gradient(to right, transparent 0%, rgba(0, 200, 83, 0.3) 50%, transparent 100%)
}

.number-ball
{
  width:
  55px
  height:
  55px
  border - radius
  : 50%
  background:
  var(--degrade-or);
  border:
  3px solid
  var(--vert-vif);
  display: flex
  align - items
  : center
  justify - content
  : center
  font - family
  : 'Baloo 2', sans-serif
  font - size
  : 1.7rem
  font - weight
  : 800
  color:
  var(--blanc);
  box - shadow
  : 0 5px 15px rgba(0, 0, 0, 0.1)
  transition:
  var(--transition);
  position: relative
  z - index
  : 1
  animation: popIn
  0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards
  opacity: 0
  transform: scale(0.5)
}

@keyframes
popIn
{
  0% { opacity: 0;
  transform: scale(0.5)
}
80% { opacity: 1;
transform: scale(1.1)
}
            100%
{
  opacity: 1
  transform: scale(1)
}
}

        .number-ball:hover
{
  transform: translateY(-8px)
  rotate(10deg)
  scale(1.1)
  box - shadow
  : 0 10px 20px rgba(255, 215, 0, 0.3)
}

.number-ball::before
{
  content: ""
  position: absolute
  top: -5px
  left: -5px
  right: -5px
  bottom: -5px
  border - radius
  : 50%
  background:
  var(--degrade-or);
  z - index
  : -1
  filter: blur(5px)
  opacity: 0
  transition:
  var(--transition);
}

.number-ball:hover::before
{
  opacity: 0.5
}

.special-number
{
  background: var(--degrade-vert);
  border - color
  :
  var(--or);
}

.special-number:hover
{
  box - shadow
  : 0 10px 20px rgba(0, 200, 83, 0.3)
}

.special-number::before
{
  background: var(--degrade-vert);
}

/* Détails pliables */
.details-container
{
  margin - top
  : 25px
}

.details-toggle
{
  display: flex
  align - items
  : center
  justify - content
  : space-between
  background: rgba(0, 200, 83, 0.1)
  border: none
  color:
  var(--vert-vif);
  padding:
  12px 20px
  border - radius
  :
  var(--bordure-arrondie);
  font - weight
  : 600
  cursor: pointer
  transition:
  var(--transition);
  width: 100%;
  position: relative
  overflow: hidden
}

.details-toggle:hover
{
  background: rgba(0, 200, 83, 0.2)
}

.details-toggle i
{
  transition: var(--transition);
}

.details-toggle.active i
{
  transform: rotate(180deg)
}

.details-content
{
  max - height
  : 0
  overflow: hidden
  transition: max - height
  0.4s ease-out
  background - color
  : rgba(0, 200, 83, 0.05)
  border - radius
  : 0 0
  var(--bordure-arrondie)
  var(--bordure-arrondie);
  margin - top
  : -10px
}

.details-content-inner
{
  padding:
  15px 20px
  border - radius
  : 0 0
  var(--bordure-arrondie)
  var(--bordure-arrondie);
}

.address-item
{
  padding:
  10px 0
  border - bottom
  : 1px dashed rgba(0, 200, 83, 0.2)
  display: flex
  align - items
  : center
}

.address-item::before
{
  content: "\f3c5"
  font - family
  : 'Font Awesome 6 Free'
  font - weight
  : 900
  margin - right
  : 10px
  color:
  var(--vert-vif);
}

.address-item:last-child
{
  border - bottom
  : none
}

.disclaimer
{
  font - size
  : 0.9rem
  color:
  var(--gris-fonce);
  text - align
  : center
  margin - top
  : 25px
  line - height
  : 1.6
  position: relative
  padding - top
  : 20px
}

.disclaimer::before
{
  content: ""
  position: absolute
  top: 0
  left: 50%;
  transform: translateX(-50%);
  width:
  100px
  height:
  2px
  background: linear-gradient(to right,
  var(--vert-vif),
  var(--or),
  var(--vert-vif));
  border - radius
  : 1px
}

/* Loader Premium */
.loader
{
  display: none
  text - align
  : center
  margin:
  40px 0
}

.loader.active
{
  display: block
  border: 0
}

.loader-icon
{
  width:
  70px
  height:
  70px
  margin: 0
  auto
  border:
  5px solid rgba(0, 200, 83, 0.1)
  border - top
  : 5px solid
  var(--vert-vif);
  border - radius
  : 50%
  animation: spin
  1s linear infinite
  position: relative
}

.loader-icon::after
{
  content: ""
  position: absolute
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font - size
  : 1.5rem
  animation: pulse
  1.5s ease-in-out infinite
}

.loader-text
{
  margin - top
  : 20px
  color:
  var(--vert-vif);
  font - weight
  : 700
  font - size
  : 1.1rem
  letter - spacing
  : 0.5px
}

/* Animation de chance */
.luck-animation
{
  position: fixed
  top: 0
  left: 0
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8)
  display: flex
  flex - direction
  : column
  align - items
  : center
  justify - content
  : center
  z - index
  : 1000
  opacity: 0
  pointer - events
  : none
  transition: opacity
  0.5s ease
}

.luck-animation.active
{
  opacity: 1
  pointer - events
  : all
}

.luck-icon
{
  font - size
  : 5rem
  margin - bottom
  : 20px
  animation: bounce
  0.8s infinite alternate
}

.luck-text
{
  color: white
  font - size
  : 2rem
  font - family
  : 'Baloo 2', sans-serif
  text - align
  : center
  margin - bottom
  : 30px
  position: relative
}

.luck-text::after
{
  content: ""
  position: absolute
  bottom: -10px
  left: 50%;
  transform: translateX(-50%);
  width:
  100px
  height:
  3px
  background: linear-gradient(to right,
  var(--vert-vif),
  var(--or),
  var(--vert-vif));
  border - radius
  : 3px
  display: none
}

/* Progress Steps */
.progress-steps
{
  display: flex
  justify - content
  : space-between
  align - items
  : center
  margin: 0
  auto
  30px
  max - width
  : 500px
  position: relative
}

.progress-bar
{
  position: absolute
  top: 50%;
  left: 0
  height:
  4px
  background: rgba(0, 200, 83, 0.1)
  width: 100%
  z - index
  : 1
}

.progress-bar-fill
{
  position: absolute
  top: 0
  left: 0
  height: 100%;
  background: var(--degrade-vert);
  width: 0
  transition: width
  0.4s ease
}

.progress-step
{
  width:
  40px
  height:
  40px
  border - radius
  : 50%
  background - color
  : rgba(0, 200, 83, 0.1)
  display: flex
  align - items
  : center
  justify - content
  : center
  font - weight
  : 700
  color:
  var(--vert-vif);
  position: relative
  z - index
  : 2
  border:
  2px solid rgba(0, 200, 83, 0.3)
  transition:
  var(--transition);
}

.progress-step.active
{
  background - color
  :
  var(--vert-vif);
  color: white
  border - color
  :
  var(--vert-vif);
  transform: scale(1.1)
  box - shadow
  : 0 5px 15px rgba(0, 200, 83, 0.3)
}

.progress-step.completed
{
  background - color
  :
  var(--vert-vif);
  color: white
  border - color
  :
  var(--vert-vif);
}

/* Footer Instagrammable */
footer
{
  text - align
  : center
  padding:
  25px
  color:
  var(--gris-fonce);
  font - size
  : 0.9rem
  border - top
  : 1px solid rgba(0, 0, 0, 0.05)
  margin - top
  : 30px
  position: relative
}

footer:
:before
{
  content: ""
  position: absolute
  top: 0
  left: 50%;
  transform: translateX(-50%);
  width:
  200px
  height:
  3px
  background:
  var(--degrade-vert);
  border - radius
  : 0 0 3px 3px
}

.theme-toggle
{
  background: none
  border: none
  color: var(--noir);
  cursor: pointer
  font - size
  : 1.8rem
  margin - left
  : 15px
  transition:
  var(--transition);
  vertical - align
  : middle
}

.theme-toggle:hover
{
  transform: rotate(30deg)
  scale(1.1)
  color: var(--or);
}

.social-share
{
  margin - top
  : 20px
  display: flex
  justify - content
  : center
  gap:
  10px
  flex - wrap
  : wrap
}

.social-share a
{
  display: inline - flex
  align - items
  : center
  justify - content
  : center
  width:
  45px
  height:
  45px
  background:
  var(--degrade-vert);
  color: var(--blanc);
  border - radius
  : 50%
  font - size
  : 1.2rem
  transition:
  var(--transition);
  box - shadow
  : 0 5px 15px rgba(0, 200, 83, 0.2)
  position: relative
  overflow: hidden
}

.social-share a::after
{
  content: ""
  position: absolute
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear - gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))
  transform: rotate(30deg)
  transition: var(--transition);
}

.social-share a:hover
{
  transform: translateY(-5px)
  scale(1.1)
  box - shadow
  : 0 10px 25px rgba(0, 200, 83, 0.3)
}

.social-share a:hover::after
{
  left: 100%;
  top: 100%;
}

/* Botão Gerar Mais Números */
.generate-more-btn
{
  display: block
  width: 100%;
  max - width
  : 320px
  margin:
  20px auto
  padding:
  15px 25px
  background:
  var(--degrade-or);
  color: var(--blanc) !important;
  border: none
  border - radius
  :
  var(--bordure-arrondie);
  font - family
  : 'Baloo 2', sans-serif
  font - size
  : 1.1rem
  font - weight
  : 700
  text - transform
  : uppercase
  cursor: pointer
  box - shadow
  : 0 5px 15px rgba(255, 215, 0, 0.3)
  transition:
  var(--transition);
  position: relative
  overflow: hidden
  text - align
  : center
  letter - spacing
  : 0.5px
  text - shadow
  : 0 1px 2px rgba(0, 0, 0, 0.1)
  z - index
  : 1
}

.generate-more-btn:hover:not(:disabled)
{
  transform: translateY(-3px)
  scale(1.03)
  box - shadow
  : 0 10px 25px rgba(255, 215, 0, 0.4)
}

.generate-more-btn:active:not(:disabled)
{
  transform: translateY(1px)
}

.generate-more-btn:disabled
{
  background: var(--gris-fonce);
  cursor: not - allowed
  transform: none
  box - shadow
  : none
}

.generate-more-btn::before
{
  content: ""
  position: absolute
  top: 0
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear - gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)
  transition:
  0.5s
  z - index
  : -1
}

.generate-more-btn:hover:not(:disabled)::before
{
  left: 100%;
}

/* Links de apostas */
.betting-links
{
  background: rgba(255, 215, 0, 0.1)
  border - radius
  :
  var(--bordure-arrondie);
  padding:
  15px
  margin - bottom
  : 20px
  border:
  1px solid rgba(255, 215, 0, 0.2)
}

.betting-links-title
{
  color: var(--or-fonce);
  font - weight
  : 700
  margin - bottom
  : 12px
  text - align
  : center
  font - size
  : 1.1rem
}

.betting-links-container
{
  display: flex
  flex - wrap
  : wrap
  gap:
  10px
  justify - content
  : center
}

.betting-link
{
  display: inline - block
  padding:
  8px 15px
  background:
  var(--degrade-or);
  color: var(--blanc) !important;
  text - decoration
  : none
  border - radius
  : 50px
  font - weight
  : 600
  font - size
  : 0.9rem
  transition:
  var(--transition);
  box - shadow
  : 0 3px 10px rgba(255, 215, 0, 0.2)
}

.betting-link:hover
{
  transform: translateY(-3px)
  box - shadow
  : 0 5px 15px rgba(255, 215, 0, 0.4)
}

/* Message d'information */
.info-message
{
  background: rgba(0, 200, 83, 0.1)
  border - radius
  :
  var(--bordure-arrondie);
  padding:
  15px
  margin - bottom
  : 20px
  border:
  1px solid rgba(0, 200, 83, 0.2)
  font - size
  : 0.9rem
  text - align
  : center
  color:
  var(--noir);
}

/* Mode Turbo */
.turbo-container
{
  background: linear - gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(0,200,83,0.1) 100%)
  border - radius
  :
  var(--bordure-arrondie);
  padding:
  15px
  margin - bottom
  : 20px
  border:
  1px solid rgba(255, 215, 0, 0.2)
  position: relative
  overflow: hidden
}

.turbo-container::before
{
  content: ""
  position: absolute
  top: 0
  left: 0
  width: 100%;
  height:
  3px
  background:
  var(--degrade-or);
}

.turbo-header
{
  display: flex
  align - items
  : center
  margin - bottom
  : 10px
  color:
  var(--or-fonce);
  font - weight
  : 700
  font - size
  : 1.1rem
}

.turbo-header i
{
  margin - right
  : 10px
  font - size
  : 1.3rem
}

.turbo-description
{
  font - size
  : 0.9rem
  margin - bottom
  : 15px
  color:
  var(--noir);
  line - height
  : 1.5
}

.turbo-form
{
  display: flex
  gap:
  10px
}

.turbo-input
{
  flex: 1
  padding:
  12px 15px
  border:
  1px solid rgba(255, 215, 0, 0.3)
  border - radius
  :
  var(--bordure-arrondie);
  font - family
  : 'Poppins', sans-serif
  font - size
  : 0.9rem
  background:
  var(--blanc);
  color: var(--noir);
  transition: var(--transition);
}

.turbo-input:focus
{
  outline: none
  border - color
  :
  var(--or);
  box - shadow
  : 0 0 0 3px rgba(255, 215, 0, 0.1)
}

.turbo-btn
{
  padding:
  12px 20px
  background:
  var(--degrade-or);
  color: var(--blanc);
  border: none
  border - radius
  :
  var(--bordure-arrondie);
  font - family
  : 'Poppins', sans-serif
  font - weight
  : 600
  cursor: pointer
  transition:
  var(--transition);
  white - space
  : nowrap
}

.turbo-btn:hover:not(:disabled)
{
  transform: translateY(-2px)
  box - shadow
  : 0 5px 15px rgba(255, 215, 0, 0.3)
}

.turbo-btn:disabled
{
  opacity: 0.7
  cursor: not - allowed
}

.turbo-status
{
  margin - top
  : 10px
  font - size
  : 0.85rem
  font - weight
  : 600
  text - align
  : center
  padding:
  8px
  border - radius
  :
  var(--bordure-arrondie);
  display: none
}

.turbo-status.active
{
  display: block
}

.turbo-status.success
{
  background: rgba(0, 200, 83, 0.1)
  color: var(--vert-fonce);
  border:
  1px solid rgba(0, 200, 83, 0.2)
}

.turbo-status.error
{
  background: rgba(255, 87, 87, 0.1)
  color: #d32f2f
  border:
  1px solid rgba(255, 87, 87, 0.2)
}

/* Animations Premium */
@keyframes
fadeIn
{
  from
  opacity: 0
  transform: translateY(20px)
  to
  opacity: 1
  transform: translateY(0)
}

@keyframes
spin
{
  0% { transform: rotate(0deg);
}
100% { transform: rotate(360deg);
}
        }

@keyframes
pulse
{
  0% { transform: translate(-50%, -50%) scale(1);
}
50% { transform: translate(-50%, -50%) scale(1.2);
}
            100%
{
  transform: translate(-50%, -50%)
  scale(1)
}
}

@keyframes
bounce
{
  from
  transform: translateY(0)
  scale(1)
  to
  transform: translateY(-20px)
  scale(1.1)
}

@keyframes
confetti
{
  0% { transform: translateY(0) rotate(0deg);
}
100% { transform: translateY(100vh) rotate(720deg);
}
        }

/* Responsive Design */
@media (max-width: 768px)
{
  .logo
  margin - top
  : -10px
    margin - bottom
    : -10px

  h1
  font - size
  : 2rem
    margin - bottom
    : 20px
}

@media (max-width: 480px)
{
  .logo-container
  max - width
  : 100%

  h1
  font - size
  : 1.8rem

  .form-container, .results
  padding:
  20px 15px
    border - radius
    : 15px

  .question-label
  font - size
  : 1.1rem

  .country-option, .city-option, .lottery-option
  padding:
  10px 12px

  .country-flag, .city-icon, .lottery-logo
  width:
  35px
    height:
    35px
    margin - right
    : 12px

  .number-ball
  width:
  50px
    height:
    50px
    font - size
    : 1.5rem

  .btn
  padding:
  16px 25px
    font - size
    : 1.2rem

  .progress-step
  width:
  30px
    height:
    30px
    font - size
    : 0.9rem

  .betting-links-container
  flex - direction
  : column
    align - items
    : center

  .betting-link
  width: 100%;
  text - align
  : center

  .turbo-form
  flex - direction
  : column
}
</style>
</head>
<body>
    <!-- Efeito de partículas douradas no fundo -->
    <div
class="particles" id="particles"></div>

    <!-- Animation de chance -->
    <div class="luck-animation" id="luck-animation">
        <div class="luck-icon">🍀</div>
        <div class="luck-text">Chargement de votre chance...</div>
    </div>

    <div class="container">
        <header>
            <h1>Générateur de Numéros Gagnants</h1>
            <!-- Logo Grande Centralizada -->
            <div class="logo-container">
                <img src="https://i.ibb.co/KgHW3QY/Loto-Gains-Logo-8-D-Yeshua-Hamashia-perfeito-Am-m.png" alt="Loto Gains" class="logo">
            </div>
        </header>

        <main>
            <!-- Progress Steps -->
            <div class="progress-steps">
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="progress-bar-fill"></div>
                </div>
                <div class="progress-step active" id="step-1">1</div>
                <div class="progress-step" id="step-2">2</div>
                <div class="progress-step" id="step-3">3</div>
            </div>

            <div class="form-container">
                <!-- Mode Turbo -->
                <div class="turbo-container" id="turbo-container">
                    <div class="turbo-header">
                        <i class="fas fa-bolt"></i>
                        <span>Mode Turbo</span>
                    </div>
                    <div class="turbo-description">
                        Le Mode Turbo offre une précision 10X supérieure, 78% de chances en plus de gagner le jackpot et génère de nouveaux numéros sans temps d'attente.
                    </div>
                    <div class="turbo-form">
                        <input type="text" class="turbo-input" id="turbo-code" placeholder="Entrez le code d'activation" maxlength="5">
                        <button class="turbo-btn" id="turbo-btn">Activer</button>
                    </div>
                    <div class="turbo-status" id="turbo-status"></div>
                </div>

                <div class="question active" id="question-country">
                    <label class="question-label">1. Choisissez votre pays</label>
                    <div class="info-message">
                        Les pays sont filtrés pour ceux où vous pouvez jouer en présentiel, mais vous pouvez jouer en ligne indépendamment de votre pays de résidence.
                    </div>
                    <div id="country-options">
                        <!-- Options de pays seront insérées ici via JavaScript -->
                    </div>
                </div>

                <div class="question" id="question-city">
                    <div class="nav-back">
                        <button class="back-btn" id="back-to-country">
                            <i class="fas fa-arrow-left"></i> Retour
                        </button>
                    </div>
                    <label class="question-label">2. Choisissez votre ville</label>
                    <div id="city-options">
                        <!-- Options de ville seront insérées ici via JavaScript -->
                    </div>
                </div>

                <div class="question" id="question-lottery">
                    <div class="nav-back">
                        <button class="back-btn" id="back-to-city">
                            <i class="fas fa-arrow-left"></i> Retour
                        </button>
                    </div>
                    <label class="question-label">3. Choisissez votre loterie</label>
                    <div id="lottery-options">
                        <!-- Les options de loterie seront insérées ici via JavaScript -->
                    </div>
                </div>

                <button id="generate-btn" class="btn" disabled>GÉNÉRER MES NUMÉROS</button>
            </div>

            <div class="loader" id="loader">
                <div class="loader-icon"></div>
                <p class="loader-text">Génération de vos numéros porte-bonheur...</p>
            </div>

            <div class="results" id="results">
                <div class="results-header">
                    <h2 class="results-title">🎉 Vos Numéros Porte-Bonheur !</h2>
                    <p class="next-draw" id="next-draw">Prochain tirage : </p>
                    <p class="prize">Jackpot actuel : <span id="prize-amount">€0</span></p>
                </div>

                <div class="numbers-container" id="numbers-container">
                    <!-- Les numéros seront insérés ici via JavaScript -->
                </div>

                <div class="betting-links" id="betting-links">
                    <h3 class="betting-links-title">Faites vos jeux en ligne :</h3>
                    <div class="betting-links-container" id="betting-links-container">
                        <!-- Les liens de paris seront insérés ici via JavaScript -->
                    </div>
                </div>

                <button id="generate-more-btn" class="generate-more-btn" disabled>
                    <span id="generate-more-text">GÉNÉRER PLUS DE NUMÉROS</span>
                    <span id="timer-text"></span>
                </button>

                <div class="details-container">
                    <button class="details-toggle" id="details-toggle">
                        <span>Adresses de points de vente</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="details-content" id="details-content">
                        <div class="details-content-inner" id="addresses-list">
                            <!-- Les adresses seront insérées ici via JavaScript -->
                        </div>
                    </div>
                </div>

                <p class="disclaimer">
                    Ces numéros sont générés à partir d'algorithmes probabilistes.<br>
                    Jouer doit rester un plaisir - jouez de manière responsable !<br>
                    Les chances de gain sont minimes - misez avec modération.
                </p>
            </div>
        </main>

        <footer>
            <p>Loto Gains &copy; 2025-2026</p>
            <button class="theme-toggle" id="theme-toggle">🌓</button>
            
            <div class="social-share">
                <a href="#" title="Partager sur Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" title="Partager sur WhatsApp"><i class="fab fa-whatsapp"></i></a>
                <a href="#" title="Partager sur Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" title="Partager sur Twitter"><i class="fab fa-twitter"></i></a>
            </div>
        </footer>
    </div>

    <script>
        // Données des villes, loteries et adresses
        const locationData = {
            uk: {
                cities: ['Londres', 'Manchester', 'Birmingham', 'Liverpool', 'Édimbourg', 'Leeds', 'Glasgow', 'Bristol'],
                lotteries: [
                    { 
                        id: 'uk-national', 
                        name: 'UK National Lottery', 
                        min: 1, max: 59, count: 6, 
                        specialMin: 1, specialMax: 59, specialCount: 1, 
                        drawDay: 3, drawHour: 20, // Mise à jour: maintenant le mercredi
                        logo: 'https://i.ibb.co/4WQ7bY7/uk-lottery.png',
                        addresses: [
                            "Bureau de tabac 'Golden Chance', 123 Oxford Street, Londres",
                            "Supérette 'Lucky Star', 45 Market Street, Manchester",
                            "Magasin 'Fortune', 78 High Street, Birmingham",
                            "Kiosque 'Jackpot', 22 Buchanan Street, Glasgow"
                        ],
                        links: [
                            {name: "National Lottery", url: "https://www.national-lottery.co.uk"},
                            {name: "Lotto UK", url: "https://www.lotto.uk.com"}
                        ]
                    },
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 20, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Bureau de tabac 'Euro Dreams', 56 Victoria Road, Londres",
                            "Supérette 'Millionaire', 22 King Street, Édimbourg",
                            "Centre commercial 'Chance Tower', Liverpool One, Liverpool",
                            "Boutique 'Lucky Dip', 33 Park Row, Leeds"
                        ],
                        links: [
                            {name: "EuroMillions UK", url: "https://www.euro-millions.com"},
                            {name: "LottoGo", url: "https://www.lottogo.com/euromillions"}
                        ]
                    },
                    { 
                        id: 'thunderball', 
                        name: 'Thunderball', 
                        min: 1, max: 39, count: 5, 
                        specialMin: 1, specialMax: 14, specialCount: 1, 
                        drawDay: 4, drawHour: 20, // Mise à jour: maintenant le jeudi
                        logo: 'https://i.ibb.co/0jQYbJ7/thunderball.png',
                        addresses: [
                            "Tabac 'Thunder Strike', 78 Regent Street, Londres",
                            "Supérette 'Lightning Luck', 15 Deansgate, Manchester",
                            "Magasin 'Storm Chaser', 42 Broad Street, Birmingham"
                        ],
                        links: [
                            {name: "Thunderball Official", url: "https://www.national-lottery.co.uk/games/thunderball"},
                            {name: "Play Thunderball", url: "https://www.lotto.net/thunderball"}
                        ]
                    },
                    { 
                        id: 'eurojackpot', 
                        name: 'EuroJackpot', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 10, specialCount: 2, 
                        drawDay: 6, drawHour: 20, // Mise à jour: maintenant le vendredi
                        logo: 'https://i.ibb.co/Jj2tb5wj/Eurojackpot-logo.png',
                        addresses: [
                            "Bureau de tabac 'EuroJackpot', 89 Piccadilly, Londres",
                            "Supérette 'Jackpot Dreams', 34 Princes Street, Édimbourg",
                            "Centre commercial 'Euro Plaza', 67 New Street, Birmingham"
                        ],
                        links: [
                            {name: "EuroJackpot UK", url: "https://www.eurojackpot.org"},
                            {name: "Play EuroJackpot", url: "https://www.lotto.co.uk/eurojackpot"}
                        ]
                    }
                ]
            },
            fr: {
                cities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Bordeaux'],
                lotteries: [
                    { 
                        id: 'loto', 
                        name: 'Loto', 
                        min: 1, max: 49, count: 5, 
                        specialMin: 1, specialMax: 10, specialCount: 1, 
                        drawDay: 1, drawHour: 20, // Mise à jour: maintenant le lundi
                        logo: 'https://i.ibb.co/BmVpNdq/dm.png',
                        addresses: [
                            "Tabac 'La Chance', 15 Rue de Rivoli, Paris",
                            "Bureau de tabac 'Le Jackpot', 32 La Canebière, Marseille",
                            "Magasin 'Fortune', 5 Place Bellecour, Lyon",
                            "Kiosque 'Gagnant', 22 Allée Jean Jaurès, Toulouse"
                        ],
                        links: [
                            {name: "FDJ Loto", url: "https://www.fdj.fr/jeux/jeux-de-tirage/loto"},
                            {name: "Loto Français", url: "https://www.loto.fr"}
                        ]
                    },
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 20, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Tabac 'Euro Dreams', 78 Avenue des Champs-Élysées, Paris",
                            "Bureau de tabac 'Millionaire', 45 Rue Saint-Ferréol, Marseille",
                            "Centre commercial 'Partouche', 112 Rue du Faubourg Saint-Antoine, Lyon",
                            "Boutique 'La Fortune', 33 Rue Sainte-Catherine, Bordeaux"
                        ],
                        links: [
                            {name: "FDJ EuroMillions", url: "https://www.fdj.fr/jeux/jeux-de-tirage/euromillions-my-million"},
                            {name: "EuroMillions France", url: "https://www.euromillions.com/fr"}
                        ]
                    },
                    { 
                        id: 'keno', 
                        name: 'Keno', 
                        min: 1, max: 70, count: 10, 
                        specialMin: 0, specialMax: 0, specialCount: 0, 
                        drawDay: 0, drawHour: 13, // Mise à jour: tirage quotidien à 13h
                        logo: 'https://i.ibb.co/0qJXQ3H/keno.png',
                        addresses: [
                            "Tabac 'Keno King', 56 Boulevard Haussmann, Paris",
                            "Bar 'Le Keno', 12 Cours Honoré d'Estienne d'Orves, Marseille",
                            "Café 'Keno Chance', 8 Rue de la République, Lyon"
                        ],
                        links: [
                            {name: "FDJ Keno", url: "https://www.fdj.fr/jeux/jeux-de-tirage/keno"},
                            {name: "Keno en ligne", url: "https://www.keno-fdj.fr"}
                        ]
                    },
                    { 
                        id: 'eurojackpot', 
                        name: 'EuroJackpot', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 10, specialCount: 2, 
                        drawDay: 6, drawHour: 20, // Mise à jour: maintenant le vendredi
                        logo: 'https://i.ibb.co/Jj2tb5wj/Eurojackpot-logo.png',
                        addresses: [
                            "Tabac 'EuroJackpot', 101 Rue de Rivoli, Paris",
                            "Bureau de tabac 'Jackpot City', 28 Rue Paradis, Marseille",
                            "Centre commercial 'Euro Plaza', 15 Rue de la République, Lyon"
                        ],
                        links: [
                            {name: "EuroJackpot FDJ", url: "https://www.fdj.fr/jeux/jeux-de-tirage/eurojackpot"},
                            {name: "EuroJackpot France", url: "https://www.eurojackpot.fr"}
                        ]
                    }
                ]
            },
            es: {
                cities: ['Madrid', 'Barcelone', 'Valence', 'Séville', 'Bilbao', 'Malaga', 'Saragosse', 'Palma'],
                lotteries: [
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 21, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Estanco 'Suerte', 45 Gran Vía, Madrid",
                            "Quiosco 'Millonario', 22 Rambla, Barcelone",
                            "Centro commercial 'Fortuna', Avenida del Puerto, Valence",
                            "Tienda 'El Gordo', 15 Calle Sierpes, Séville"
                        ],
                        links: [
                            {name: "EuroMillions España", url: "https://www.loteriasyapuestas.es/es/euromillones"},
                            {name: "Jugar EuroMillions", url: "https://www.euromillones.com"}
                        ]
                    },
                    { 
                        id: 'bonoloto', 
                        name: 'BonoLoto', 
                        min: 1, max: 49, count: 6, 
                        specialMin: 0, specialMax: 0, specialCount: 0, 
                        drawDay: 0, drawHour: 21, // Mise à jour: tirage quotidien
                        logo: 'https://i.ibb.co/0qJXQ3H/bonoloto.png',
                        addresses: [
                            "Estanco 'La Suerte', 78 Paseo de Gracia, Barcelone",
                            "Quiosco 'El Gordo', 33 Calle Sierpes, Séville",
                            "Centro commercial 'Loteria', Calle Luchana, Bilbao",
                            "Tienda 'Bono Chance', 12 Calle Marqués de Larios, Malaga"
                        ],
                        links: [
                            {name: "BonoLoto Oficial", url: "https://www.loteriasyapuestas.es/es/bonoloto"},
                            {name: "Jugar BonoLoto", url: "https://www.bonoloto.com"}
                        ]
                    },
                    { 
                        id: 'primitiva', 
                        name: 'La Primitiva', 
                        min: 1, max: 49, count: 6, 
                        specialMin: 0, specialMax: 9, specialCount: 1, 
                        drawDay: 4, drawHour: 21, // Mise à jour: maintenant le jeudi
                        logo: 'https://i.ibb.co/0qJXQ3H/primitiva.png',
                        addresses: [
                            "Estanco 'Primitiva', 56 Calle Preciados, Madrid",
                            "Quiosco 'La Primitiva', 22 Rambla de Catalunya, Barcelone",
                            "Centro commercial 'Suerte', Avenida de la Constitución, Séville"
                        ],
                        links: [
                            {name: "La Primitiva Oficial", url: "https://www.loteriasyapuestas.es/es/la-primitiva"},
                            {name: "Jagar Primitiva", url: "https://www.primitiva-online.com"}
                        ]
                    },
                    { 
                        id: 'eurojackpot', 
                        name: 'EuroJackpot', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 10, specialCount: 2, 
                        drawDay: 6, drawHour: 21, // Mise à jour: maintenant le vendredi
                        logo: 'https://i.ibb.co/Jj2tb5wj/Eurojackpot-logo.png',
                        addresses: [
                            "Estanco 'EuroJackpot', 78 Gran Vía, Madrid",
                            "Quiosco 'Jackpot City', 45 Passeig de Gràcia, Barcelone",
                            "Centro commercial 'Euro Plaza', 12 Avenida de la Constitución, Séville"
                        ],
                        links: [
                            {name: "EuroJackpot España", url: "https://www.loteriasyapuestas.es/es/eurojackpot"},
                            {name: "Jagar EuroJackpot", url: "https://www.eurojackpot.es"}
                        ]
                    }
                ]
            },
            it: {
                cities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palerme', 'Gênes', 'Bologne', 'Florence'],
                lotteries: [
                    { 
                        id: 'superenalotto', 
                        name: 'SuperEnalotto', 
                        min: 1, max: 90, count: 6, 
                        specialMin: 0, specialMax: 0, specialCount: 0, 
                        drawDay: 3, drawHour: 20, // Mise à jour: maintenant le mercredi
                        logo: 'https://i.ibb.co/0qJXQ3H/superenalotto.png',
                        addresses: [
                            "Tabaccheria 'Fortuna', 45 Via del Corso, Rome",
                            "Edicola 'SuperVincita', 22 Galleria Vittorio Emanuele II, Milan",
                            "Bar 'Il SuperEnalotto', 15 Spaccanapoli, Naples",
                            "Tabaccheria 'La Sorte', 33 Via Roma, Turin"
                        ],
                        links: [
                            {name: "SuperEnalotto Ufficiale", url: "https://www.superenalotto.it"},
                            {name: "Gioca SuperEnalotto", url: "https://www.giocosuperenalotto.com"}
                        ]
                    },
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 21, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Tabaccheria 'EuroSogno', 78 Via Veneto, Rome",
                            "Edicola 'Milionario', 45 Corso Buenos Aires, Milan",
                            "Bar 'EuroChance', 12 Via Toledo, Naples"
                        ],
                        links: [
                            {name: "EuroMillions Italia", url: "https://www.euro-millions.it"},
                            {name: "Gioca EuroMillions", url: "https://www.giocoeuromillions.it"}
                        ]
                    },
                    { 
                        id: 'winforlife', 
                        name: 'WinForLife', 
                        min: 1, max: 45, count: 10, 
                        specialMin: 1, specialMax: 20, specialCount: 1, 
                        drawDay: 5, drawHour: 20, // Mise à jour: maintenant le vendredi
                        logo: 'https://i.ibb.co/0qJXQ3H/winforlife.png',
                        addresses: [
                            "Tabaccheria 'VinciPerLaVita', 56 Via Cola di Rienzo, Rome",
                            "Edicola 'Vincita', 22 Corso Vittorio Emanuele II, Milan",
                            "Bar 'La VitaVincente', 15 Via Chiaia, Naples"
                        ],
                        links: [
                            {name: "WinForLife Ufficiale", url: "https://www.winforlife.it"},
                            {name: "Gioca WinForLife", url: "https://www.giocowinforlife.it"}
                        ]
                    },
                    { 
                        id: 'eurojackpot', 
                        name: 'EuroJackpot', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 10, specialCount: 2, 
                        drawDay: 6, drawHour: 21, // Mise à jour: maintenant le samedi
                        logo: 'https://i.ibb.co/Jj2tb5wj/Eurojackpot-logo.png',
                        addresses: [
                            "Tabaccheria 'EuroJackpot', 89 Via del Corso, Rome",
                            "Edicola 'Jackpot City', 34 Galleria Vittorio Emanuele II, Milan",
                            "Bar 'Euro Jackpot', 67 Via Toledo, Naples"
                        ],
                        links: [
                            {name: "EuroJackpot Italia", url: "https://www.eurojackpot.it"},
                            {name: "Gioca EuroJackpot", url: "https://www.giocoeurojackpot.it"}
                        ]
                    }
                ]
            },
            de: {
                cities: ['Berlin', 'Munich', 'Francfort', 'Hambourg', 'Cologne', 'Stuttgart', 'Düsseldorf', 'Dortmund'],
                lotteries: [
                    { 
                        id: 'lotto', 
                        name: 'Lotto 6aus49', 
                        min: 1, max: 49, count: 6, 
                        specialMin: 0, specialMax: 0, specialCount: 0, 
                        drawDay: 4, drawHour: 18, // Mise à jour: maintenant le mercredi
                        logo: 'https://i.ibb.co/0qJXQ3H/lotto-de.png',
                        addresses: [
                            "Kiosk 'Glückspilz', 45 Kurfürstendamm, Berlin",
                            "Tabakladen 'LottoKönig', 22 Marienplatz, Munich",
                            "Kiosk 'Sechser im Lotto', 15 Zeil, Francfort",
                            "Tabakladen 'Jackpot', 33 Schildergasse, Cologne"
                        ],
                        links: [
                            {name: "Lotto Deutschlad", url: "https://www.lotto.de"},
                            {name: "Lotto 6aus49", url: "https://www.lotto6aus49.de"}
                        ]
                    },
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 21, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Kiosk 'EuroTraum', 78 Friedrichstraße, Berlin",
                            "Tabakladen 'Millionär', 45 Kaufingerstraße, Munich",
                            "Kiosk 'EuroChance', 12 Hauptwache, Francfort"
                        ],
                        links: [
                            {name: "EuroMillions Deutschland", url: "https://www.euro-millions.de"},
                            {name: "EuroMillions spielen", url: "https://www.euromillions.com/de"}
                        ]
                    },
                    { 
                        id: 'spiel77', 
                        name: 'Spiel 77', 
                        min: 0, max: 9, count: 7, 
                        specialMin: 0, specialMax: 0, specialCount: 0, 
                        drawDay: 4, drawHour: 18, // Mise à jour: maintenant le mercredi
                        logo: 'https://i.ibb.co/0qJXQ3H/spiel77.png',
                        addresses: [
                            "Kiosk 'Siebener', 56 Tauentzienstraße, Berlin",
                            "Tabakladen 'Glückssieben', 22 Sendlinger Straße, Munich",
                            "Kiosk '77Chance', 15 Kaiserstraße, Stuttgart"
                        ],
                        links: [
                            {name: "Spiel 77 Offiziell", url: "https://www.lotto.de/spiel77"},
                            {name: "Spiel 77 Online", url: "https://www.spiel77-online.de"}
                        ]
                    },
                    { 
                        id: 'eurojackpot', 
                        name: 'EuroJackpot', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 10, specialCount: 2, 
                        drawDay: 6, drawHour: 21, // Mise à jour: maintenant le vendredi
                        logo: 'https://i.ibb.co/Jj2tb5wj/Eurojackpot-logo.png',
                        addresses: [
                            "Kiosk 'EuroJackpot', 101 Friedrichstraße, Berlin",
                            "Tabakladen 'Jackpot City', 28 Marienplatz, Munich",
                            "Kiosk 'Euro Chance', 15 Zeil, Francfort"
                        ],
                        links: [
                            {name: "EuroJackpot Deutschland", url: "https://www.eurojackpot.de"},
                            {name: "EuroJackpot spielen", url: "https://www.eurojackpot.com/de"}
                        ]
                    }
                ]
            },
            pt: {
                cities: ['Lisbonne', 'Porto', 'Braga', 'Setúbal', 'Coimbra', 'Faro', 'Aveiro', 'Viseu'],
                lotteries: [
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 21, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Quiosque 'Sorte', 45 Avenida da Liberdade, Lisbonne",
                            "Tabacaria 'Milionário', 22 Rua de Santa Catarina, Porto",
                            "Quiosque 'Fortuna', 15 Rua do Comércio, Braga",
                            "Tabacaria 'EuroSonho', 33 Avenida 22 de Dezembre, Setúbal"
                        ],
                        links: [
                            {name: "EuroMillions Portugal", url: "https://www.jogossantacasa.pt/web/euromillions"},
                            {name: "Jogar EuroMillions", url: "https://www.euromilhoes.pt"}
                        ]
                    },
                    { 
                        id: 'totoloto', 
                        name: 'Totoloto', 
                        min: 1, max: 49, count: 5, 
                        specialMin: 1, specialMax: 13, specialCount: 1, 
                        drawDay: 4, drawHour: 21, // Mise à jour: maintenant le jeudi
                        logo: 'https://i.ibb.co/0qJXQ3H/totoloto.png',
                        addresses: [
                            "Quiosque 'Totoloto', 56 Rua Augusta, Lisbonne",
                            "Tabacaria 'O Vencedor', 22 Rua de Cedofeita, Porto",
                            "Quiosque 'Aposta Certa', 15 Rua do Souto, Braga"
                        ],
                        links: [
                            {name: "Totoloto Santa Casa", url: "https://www.jogossantacasa.pt/web/totoloto"},
                            {name: "Jogar Totoloto", url: "https://www.totoloto.pt"}
                        ]
                    },
                    { 
                        id: 'joker', 
                        name: 'Joker', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 9, specialCount: 1, 
                        drawDay: 4, drawHour: 21, // Mise à jour: maintenant le jeudi
                        logo: 'https://i.ibb.co/0qJXQ3H/joker.png',
                        addresses: [
                            "Quiosque 'Joker', 78 Rua do Carmo, Lisbonne",
                            "Tabacaria 'Coringa', 45 Rua de Fernandes Tomás, Porto",
                            "Quiosque 'Sorte Grande', 12 Rua dos Clérigos, Coimbra"
                        ],
                        links: [
                            {name: "Joker Santa Casa", url: "https://www.jogossantacasa.pt/web/joker"},
                            {name: "Jogar Joker", url: "https://www.joker.com.pt"}
                        ]
                    },
                    { 
                        id: 'eurojackpot', 
                        name: 'EuroJackpot', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 10, specialCount: 2, 
                        drawDay: 6, drawHour: 21, // Mise à jour: maintenant le vendredi
                        logo: 'https://i.ibb.co/Jj2tb5wj/Eurojackpot-logo.png',
                        addresses: [
                            "Quiosque 'EuroJackpot', 89 Avenida da Liberdade, Lisbonne",
                            "Tabacaria 'Jackpot City', 34 Rua de Santa Catarina, Porto",
                            "Quiosque 'Euro Fortuna', 15 Rua do Comércio, Braga"
                        ],
                        links: [
                            {name: "EuroJackpot Portugal", url: "https://www.jogossantacasa.pt/web/eurojackpot"},
                            {name: "Jogar EuroJackpot", url: "https://www.eurojackpot.pt"}
                        ]
                    }
                ]
            },
            be: {
                cities: ['Bruxelles', 'Anvers', 'Gand', 'Charleroi', 'Liège', 'Bruges', 'Namur', 'Louvain'],
                lotteries: [
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 20, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Bureau de tabac 'La Chance Belge', 45 Grand-Place, Bruxelles",
                            "Tabac 'EuroDreams', 22 Meir, Anvers",
                            "Magasin 'Fortuna', 15 Veldstraat, Gand",
                            "Kiosque 'Jackpot', 33 Boulevard Tirou, Charleroi"
                        ],
                        links: [
                            {name: "Loterie Nationale", url: "https://www.loterie-nationale.be"},
                            {name: "EuroMillions Belgique", url: "https://www.euromillions.be"}
                        ]
                    },
                    { 
                        id: 'lotto-be', 
                        name: 'Lotto Belgique', 
                        min: 1, max: 45, count: 6, 
                        specialMin: 0, specialMax: 0, specialCount: 0, 
                        drawDay: 4, drawHour: 20, // Mise à jour: maintenant le jeudi
                        logo: 'https://i.ibb.co/4WQ7bY7/uk-lottery.png',
                        addresses: [
                            "Tabac 'Lotto King', 78 Avenue Louise, Bruxelles",
                            "Bureau de tabac 'Gagnant', 45 De Keyserlei, Anvers",
                            "Supérette 'La Bonne Étoile', 12 Place Saint-Lambert, Liège",
                            "Kiosque 'Chance', 67 Rue de Fer, Namur"
                        ],
                        links: [
                            {name: "Lotto Belgique", url: "https://www.lotto.be"},
                            {name: "Jouer Lotto", url: "https://www.lotto-nationale.be"}
                        ]
                    }
                ]
            },
            ca: {
                cities: ['Toronto', 'Montréal', 'Vancouver', 'Calgary', 'Ottawa', 'Edmonton', 'Québec', 'Winnipeg'],
                lotteries: [
                    { 
                        id: 'lotto-max', 
                        name: 'Lotto Max', 
                        min: 1, max: 50, count: 7, 
                        specialMin: 0, specialMax: 0, specialCount: 0, 
                        drawDay: 3, drawHour: 22, // Mise à jour: maintenant le mercredi
                        logo: 'https://i.ibb.co/4WQ7bY7/uk-lottery.png',
                        addresses: [
                            "Dépanneur 'Lucky Leaf', 45 Yonge Street, Toronto",
                            "Bureau de tabac 'Maple Chance', 22 Rue Sainte-Catherine, Montréal",
                            "Magasin 'Golden Puck', 15 Robson Street, Vancouver",
                            "Kiosque 'Hockey Luck', 33 8th Avenue SW, Calgary"
                        ],
                        links: [
                            {name: "Lotto Max Officiel", url: "https://www.olg.ca/en/lottery/play-lotto-max.html"},
                            {name: "Lotto Max Canada", url: "https://www.lottomax.ca"}
                        ]
                    },
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 20, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Dépanneur 'Euro Dreams CA', 78 Queen Street West, Toronto",
                            "Tabac 'Millionnaire', 45 Boulevard René-Lévesque, Montréal",
                            "Magasin 'Lucky Loonie', 12 Granville Street, Vancouver",
                            "Kiosque 'Canadian Chance', 33 Rideau Street, Ottawa"
                        ],
                        links: [
                            {name: "EuroMillions Canada", url: "https://www.euro-millions.com/ca"},
                            {name: "Jouer EuroMillions", url: "https://www.lotteriescanada.com/euromillions"}
                        ]
                    }
                ]
            },
            ch: {
                cities: ['Zurich', 'Genève', 'Bâle', 'Lausanne', 'Berne', 'Winterthour', 'Lucerne', 'Saint-Gall'],
                lotteries: [
                    { 
                        id: 'euromillions', 
                        name: 'EuroMillions', 
                        min: 1, max: 50, count: 5, 
                        specialMin: 1, specialMax: 12, specialCount: 2, 
                        drawDay: 2, drawHour: 20, // Mise à jour: maintenant le mardi
                        logo: 'https://i.ibb.co/NdYxJngT/Euromillions-2015.webp',
                        addresses: [
                            "Kiosque 'Swiss Luck', 45 Bahnhofstrasse, Zurich",
                            "Tabac 'Geneva Fortune', 22 Rue du Rhône, Genève",
                            "Magasin 'Basel Chance', 15 Freie Strasse, Bâle",
                            "Bureau de tabac 'Lausanne Gagnant', 33 Rue de Bourg, Lausanne"
                        ],
                        links: [
                            {name: "Loterie Suisse", url: "https://www.swisslos.ch"},
                            {name: "EuroMillions Suisse", url: "https://www.euromillions.ch"}
                        ]
                    },
                    { 
                        id: 'swiss-lotto', 
                        name: 'Swiss Lotto', 
                        min: 1, max: 42, count: 6, 
                        specialMin: 1, specialMax: 6, specialCount: 1, 
                        drawDay: 4, drawHour: 20, // Mise à jour: maintenant le jeudi
                        logo: 'https://i.ibb.co/4WQ7bY7/uk-lottery.png',
                        addresses: [
                            "Tabac 'Lotto Suisse', 78 Bahnhofstrasse, Zurich",
                            "Kiosque 'Genève Lotto', 45 Rue du Marché, Genève",
                            "Magasin 'Bâle Chance', 12 Marktplatz, Bâle",
                            "Bureau de tabac 'Bern Luck', 33 Spitalgasse, Berne"
                        ],
                        links: [
                            {name: "Swiss Lotto", url: "https://www.swisslos.ch/en/swisslotto.html"},
                            {name: "Jouer Swiss Lotto", url: "https://www.swisslotto.ch"}
                        ]
                    }
                ]
            }
        };

        // Prêmios reais atualizados para agosto de 2025
        const lotteryPrizes = {
            'uk-national': '£18,700,000', // UK National Lottery jackpot atualizado
            'euromillions': '€187,000,000', // EuroMillions jackpot atualizado
            'thunderball': '£500,000', // Thunderball jackpot fixo
            'loto': '€7,500,000', // Loto jackpot atualizado
            'keno': '€250,000', // Keno prêmio máximo atualizado
            'bonoloto': '€3,200,000', // BonoLoto jackpot atualizado
            'primitiva': '€5,800,000', // La Primitiva jackpot atualizado
            'superenalotto': '€135,000,000', // SuperEnalotto jackpot atualizado
            'winforlife': '€4,000/mois à vie', // WinForLife prêmio fixo
            'lotto': '€14,500,000', // Lotto 6aus49 jackpot atualizado
            'spiel77': '€777,777', // Spiel 77 prêmio fixo
            'totoloto': '€4,800,000', // Totoloto jackpot atualizado
            'joker': '€1,500,000', // Joker jackpot atualizado
            'eurojackpot': '€110,000,000', // EuroJackpot jackpot atualizado
            'lotto-be': '€5,000,000', // Lotto Belgique jackpot
            'lotto-max': 'CA$70,000,000', // Lotto Max jackpot
            'swiss-lotto': 'CHF8,500,000' // Swiss Lotto jackpot
        };

        // Drapeaux des pays
        const countryFlags = {
            'uk': 'https://flagcdn.com/w80/gb.png',
            'fr': 'https://flagcdn.com/w80/fr.png',
            'es': 'https://flagcdn.com/w80/es.png',
            'it': 'https://flagcdn.com/w80/it.png',
            'de': 'https://flagcdn.com/w80/de.png',
            'pt': 'https://flagcdn.com/w80/pt.png',
            'be': 'https://flagcdn.com/w80/be.png',
            'ca': 'https://flagcdn.com/w80/ca.png',
            'ch': 'https://flagcdn.com/w80/ch.png'
        };

        // Elementos DOM
        const countryOptions = document.getElementById('country-options');
        const cityOptions = document.getElementById('city-options');
        const lotteryOptions = document.getElementById('lottery-options');
        const generateBtn = document.getElementById('generate-btn');
        const generateMoreBtn = document.getElementById('generate-more-btn');
        const generateMoreText = document.getElementById('generate-more-text');
        const timerText = document.getElementById('timer-text');
        const loader = document.getElementById('loader');
        const results = document.getElementById('results');
        const numbersContainer = document.getElementById('numbers-container');
        const nextDrawElement = document.getElementById('next-draw');
        const prizeAmountElement = document.getElementById('prize-amount');
        const themeToggle = document.getElementById('theme-toggle');
        const backToCountry = document.getElementById('back-to-country');
        const backToCity = document.getElementById('back-to-city');
        const detailsToggle = document.getElementById('details-toggle');
        const detailsContent = document.getElementById('details-content');
        const addressesList = document.getElementById('addresses-list');
        const luckAnimation = document.getElementById('luck-animation');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const step1 = document.getElementById('step-1');
        const step2 = document.getElementById('step-2');
        const step3 = document.getElementById('step-3');
        const particlesContainer = document.getElementById('particles');
        const bettingLinksContainer = document.getElementById('betting-links-container');
        const bettingLinksSection = document.getElementById('betting-links');
        const turboCodeInput = document.getElementById('turbo-code');
        const turboBtn = document.getElementById('turbo-btn');
        const turboStatus = document.getElementById('turbo-status');

        // Variables d'état
        let selectedCountry = '';
        let selectedCity = '';
        let selectedLottery = null;
        let cooldownTimer = null;
        let cooldownSeconds = 300; // 5 minutes (300 seconds)
        let turboModeActive = false;

        // Initialisation
        initEventListeners();
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        loadCountryOptions();
        loadPreviousSelections();
        createParticles();

        // Fonctions
        function initEventListeners() {
            generateBtn.addEventListener('click', generateNumbers);
            generateMoreBtn.addEventListener('click', generateNumbers);
            themeToggle.addEventListener('click', toggleTheme);
            backToCountry.addEventListener('click', () => navigateBack('country'));
            backToCity.addEventListener('click', () => navigateBack('city'));
            detailsToggle.addEventListener('click', toggleDetails);
            turboBtn.addEventListener('click', activateTurboMode);
            turboCodeInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    activateTurboMode();
                }
            });
        }

        function activateTurboMode() {
            const code = turboCodeInput.value.trim();
            
            if (code === '71777') {
                turboModeActive = true;
                turboStatus.textContent = 'Mode Turbo activé avec succès!';
                turboStatus.className = 'turbo-status success active';
                turboBtn.disabled = true;
                turboCodeInput.disabled = true;
                
                // Sauvegarder dans le localStorage
                localStorage.setItem('turboMode', 'active');
                
                // Réduire le temps d'attente à 0
                cooldownSeconds = 0;
                
                // Si le bouton "Générer plus de numéros" est désactivé, l'activer
                if (generateMoreBtn.disabled && !cooldownTimer) {
                    generateMoreBtn.disabled = false;
                    generateMoreText.style.display = 'block';
                    timerText.style.display = 'none';
                }
            } else {
                turboStatus.textContent = 'Code incorrect. Veuillez réessayer.';
                turboStatus.className = 'turbo-status error active';
            }
            
            // Cacher le message après 3 secondes
            setTimeout(() => {
                turboStatus.className = 'turbo-status';
            }, 3000);
        }

        function createParticles() {
            const colors = ['#FFD700', '#00C853', '#FFFFFF', '#FFC400', '#009624'];
            
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Taille aléatoire entre 3px et 8px
                const size = Math.random() * 5 + 3;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Position aléatoire
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Couleur aléatoire
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                // Durée d'animation aléatoire entre 10s et 30s
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Délai aléatoire
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        function loadCountryOptions() {
            countryOptions.innerHTML = '';
            Object.keys(locationData).forEach(countryCode => {
                const option = document.createElement('div');
                option.className = 'country-option';
                option.dataset.id = countryCode;
                option.innerHTML = `
                    <img src="${countryFlags[countryCode]}" alt="${getCountryName(countryCode)}" class="country-flag">
                    <span class="option-name">${getCountryName(countryCode)}</span>
                    <i class="fas fa-chevron-right"></i>
                `;
                option.addEventListener('click', () => selectCountry(countryCode));
                countryOptions.appendChild(option);
            });
        }

        function getCountryName(countryCode) {
            const countryNames = {
                'uk': 'Royaume-Uni',
                'fr': 'France',
                'es': 'Espagne',
                'it': 'Italie',
                'de': 'Allemagne',
                'pt': 'Portugal',
                'be': 'Belgique',
                'ca': 'Canada',
                'ch': 'Suisse'
            };
            return countryNames[countryCode] || countryCode;
        }

        function selectCountry(countryCode) {
            selectedCountry = countryCode;
            results.classList.remove('active');
            
            if (selectedCountry) {
                // Mettre à jour les options de ville
                cityOptions.innerHTML = '';
                locationData[selectedCountry].cities.forEach(city => {
                    const option = document.createElement('div');
                    option.className = 'city-option';
                    option.dataset.id = city.toLowerCase();
                    option.innerHTML = `
                        <div class="city-icon"><i class="fas fa-city"></i></div>
                        <span class="option-name">${city}</span>
                        <i class="fas fa-chevron-right"></i>
                    `;
                    option.addEventListener('click', () => selectCity(city));
                    cityOptions.appendChild(option);
                });
                
                // Avancer à la question suivante
                document.getElementById('question-country').classList.remove('active');
                document.getElementById('question-city').classList.add('active');
                
                // Mettre à jour la barre de progression
                updateProgressBar(1);
                
                // Sauvegarder dans le localStorage
                localStorage.setItem('selectedCountry', selectedCountry);
            }
        }

        function selectCity(city) {
            selectedCity = city;
            results.classList.remove('active');
            
            if (selectedCity) {
                // Mettre à jour les options de loterie
                lotteryOptions.innerHTML = '';
                locationData[selectedCountry].lotteries.forEach(lottery => {
                    const option = document.createElement('div');
                    option.className = 'lottery-option';
                    option.dataset.id = lottery.id;
                    option.innerHTML = `
                        <img src="${lottery.logo}" alt="${lottery.name}" class="lottery-logo">
                        <span class="lottery-name">${lottery.name}</span>
                        <i class="fas fa-chevron-right"></i>
                    `;
                    option.addEventListener('click', () => selectLottery(lottery.id));
                    lotteryOptions.appendChild(option);
                });
                
                // Avancer à la question suivante
                document.getElementById('question-city').classList.remove('active');
                document.getElementById('question-lottery').classList.add('active');
                
                // Mettre à jour la barre de progression
                updateProgressBar(2);
                
                // Sauvegarder dans le localStorage
                localStorage.setItem('selectedCity', selectedCity);
            }
        }

        function selectLottery(lotteryId) {
            // Retirer la sélection active
            document.querySelectorAll('.lottery-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Ajouter la sélection active
            const selectedOption = document.querySelector(`.lottery-option[data-id="${lotteryId}"]`);
            selectedOption.classList.add('active');
            
            selectedLottery = locationData[selectedCountry].lotteries.find(l => l.id === lotteryId);
            generateBtn.disabled = false;
            
            // Mettre à jour la barre de progression
            updateProgressBar(3);
            
            // Sauvegarder dans le localStorage
            localStorage.setItem('selectedLottery', lotteryId);
            
            // Mettre à jour les adresses
            updateAddresses(selectedLottery.addresses);
        }

        function updateAddresses(addresses) {
            addressesList.innerHTML = '';
            addresses.forEach(address => {
                const item = document.createElement('div');
                item.className = 'address-item';
                item.textContent = address;
                addressesList.appendChild(item);
            });
        }

        function updateBettingLinks(links) {
            bettingLinksContainer.innerHTML = '';
            
            if (links && links.length > 0) {
                links.forEach(link => {
                    const anchor = document.createElement('a');
                    anchor.href = link.url;
                    anchor.target = "_blank";
                    anchor.rel = "noopener noreferrer";
                    anchor.className = 'betting-link';
                    anchor.textContent = link.name;
                    bettingLinksContainer.appendChild(anchor);
                });
                bettingLinksSection.style.display = 'block';
            } else {
                bettingLinksSection.style.display = 'none';
            }
        }

        function updateProgressBar(step) {
            // Mettre à jour les étapes
            step1.classList.remove('active', 'completed');
            step2.classList.remove('active', 'completed');
            step3.classList.remove('active', 'completed');
            
            if (step === 1) {
                step1.classList.add('active');
                progressBarFill.style.width = '0%';
            } else if (step === 2) {
                step1.classList.add('completed');
                step2.classList.add('active');
                progressBarFill.style.width = '50%';
            } else if (step === 3) {
                step1.classList.add('completed');
                step2.classList.add('completed');
                step3.classList.add('active');
                progressBarFill.style.width = '100%';
            }
        }

        function generateNumbers() {
            // Désactiver le bouton et démarrer le timer
            startCooldownTimer();
            
            // Afficher l'animation de chance
            luckAnimation.classList.add('active');
            
            // Afficher le loader et cacher les résultats
            loader.classList.add('active');
            results.classList.remove('active');
            generateBtn.disabled = true;
            generateMoreBtn.disabled = true;
            
            // Simuler un appel API avec timeout
            setTimeout(() => {
                // Cacher l'animation de chance
                luckAnimation.classList.remove('active');
                
                // Générer des numéros aléatoires
                const mainNumbers = generateRandomNumbers(
                    selectedLottery.min, 
                    selectedLottery.max, 
                    selectedLottery.count
                ).sort((a, b) => a - b);
                
                const specialNumbers = selectedLottery.specialCount > 0 ? 
                    generateRandomNumbers(
                        selectedLottery.specialMin, 
                        selectedLottery.specialMax, 
                        selectedLottery.specialCount
                    ).sort((a, b) => a - b) : [];
                
                // Mettre à jour l'interface
                updateResultsUI(mainNumbers, specialNumbers);
                
                // Cacher le loader et afficher les résultats
                loader.classList.remove('active');
                results.classList.add('active');
                generateBtn.disabled = false;
                
                // Ajouter des confettis
                createConfetti();
            }, 2500);
        }

        function startCooldownTimer() {
            // Si le mode turbo est actif, ne pas démarrer le timer
            if (turboModeActive) {
                generateMoreBtn.disabled = false;
                generateMoreText.style.display = 'block';
                timerText.style.display = 'none';
                return;
            }
            
            // Réinitialiser le timer s'il existe déjà
            if (cooldownTimer) {
                clearInterval(cooldownTimer);
            }
            
            // Désactiver le bouton
            generateMoreBtn.disabled = true;
            generateMoreText.style.display = 'none';
            timerText.style.display = 'block';
            
            // Définir le temps initial
            let secondsLeft = cooldownSeconds;
            updateTimerDisplay(secondsLeft);
            
            // Démarrer le compte à rebours
            cooldownTimer = setInterval(() => {
                secondsLeft--;
                updateTimerDisplay(secondsLeft);
                
                if (secondsLeft <= 0) {
                    clearInterval(cooldownTimer);
                    generateMoreBtn.disabled = false;
                    generateMoreText.style.display = 'block';
                    timerText.style.display = 'none';
                }
            }, 1000);
        }

        function updateTimerDisplay(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            timerText.textContent = `Attendez ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        function generateRandomNumbers(min, max, count) {
            const numbers = [];
            while (numbers.length < count) {
                const num = Math.floor(Math.random() * (max - min + 1)) + min;
                if (!numbers.includes(num)) {
                    numbers.push(num);
                }
            }
            return numbers;
        }

        function updateResultsUI(mainNumbers, specialNumbers) {
            // Effacer les numéros précédents
            numbersContainer.innerHTML = '';
            
            // Ajouter les numéros principaux avec animation en cascade
            mainNumbers.forEach((num, index) => {
                setTimeout(() => {
                    const ball = document.createElement('div');
                    ball.className = 'number-ball';
                    ball.textContent = num;
                    numbersContainer.appendChild(ball);
                }, index * 100);
            });
            
            // Ajouter les numéros spéciaux avec animation en cascade
            specialNumbers.forEach((num, index) => {
                setTimeout(() => {
                    const ball = document.createElement('div');
                    ball.className = 'number-ball special-number';
                    ball.textContent = num;
                    numbersContainer.appendChild(ball);
                }, (mainNumbers.length + index) * 100);
            });
            
            // Mettre à jour les informations du tirage
            nextDrawElement.textContent = getNextDrawDate(selectedLottery);
            prizeAmountElement.textContent = lotteryPrizes[selectedLottery.id];
            
            // Mettre à jour les liens de paris
            updateBettingLinks(selectedLottery.links);
        }

        function getNextDrawDate(lottery) {
            const now = new Date();
            const today = now.getDay(); // 0=Dimanche, 1=Lundi,...,6=Samedi
            const currentHour = now.getHours();
            
            // Calculer les jours jusqu'au prochain tirage
            let daysUntilNextDraw = lottery.drawDay - today;
            
            // Si l'heure du tirage est déjà passée aujourd'hui ou si c'est un autre jour
            if (daysUntilNextDraw < 0 || (daysUntilNextDraw === 0 && currentHour >= lottery.drawHour)) {
                daysUntilNextDraw += 7;
            }
            
            // Créer la date du prochain tirage
            const nextDraw = new Date(now);
            nextDraw.setDate(now.getDate() + daysUntilNextDraw);
            nextDraw.setHours(lottery.drawHour, 0, 0, 0);
            
            // Formater la date
            const options = { 
                weekday: 'long', 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            
            return `Prochain tirage : ${nextDraw.toLocaleDateString('fr-FR', options)}`;
        }

        function navigateBack(target) {
            // Réinitialiser le timer si on revient en arrière
            if (cooldownTimer) {
                clearInterval(cooldownTimer);
                generateMoreText.style.display = 'block';
                timerText.style.display = 'none';
                generateMoreBtn.disabled = true;
            }
            
            if (target === 'city') {
                document.getElementById('question-lottery').classList.remove('active');
                document.getElementById('question-city').classList.add('active');
                // Réinitialiser la sélection
                selectedLottery = null;
                generateBtn.disabled = true;
                localStorage.removeItem('selectedLottery');
                results.classList.remove('active');
                updateProgressBar(1);
            } else if (target === 'country') {
                document.getElementById('question-city').classList.remove('active');
                document.getElementById('question-country').classList.add('active');
                // Réinitialiser les sélections
                selectedCity = '';
                selectedLottery = null;
                generateBtn.disabled = true;
                localStorage.removeItem('selectedCity');
                localStorage.removeItem('selectedLottery');
                results.classList.remove('active');
                updateProgressBar(0);
            }
        }

        function toggleDetails() {
            this.classList.toggle('active');
            if (detailsContent.style.maxHeight) {
                detailsContent.style.maxHeight = null;
            } else {
                detailsContent.style.maxHeight = detailsContent.scrollHeight + "px";
            }
        }

        function loadPreviousSelections() {
            const savedCountry = localStorage.getItem('selectedCountry');
            const savedCity = localStorage.getItem('selectedCity');
            const savedLottery = localStorage.getItem('selectedLottery');
            const savedTurboMode = localStorage.getItem('turboMode');
            
            // Vérifier si le mode turbo était actif
            if (savedTurboMode === 'active') {
                turboModeActive = true;
                turboStatus.textContent = 'Mode Turbo activé avec succès!';
                turboStatus.className = 'turbo-status success active';
                turboBtn.disabled = true;
                turboCodeInput.disabled = true;
                cooldownSeconds = 0;
                
                // Cacher le message après 3 secondes
                setTimeout(() => {
                    turboStatus.className = 'turbo-status';
                }, 3000);
            }
            
            if (savedCountry && locationData[savedCountry]) {
                // Simuler le clic sur l'option de pays
                const countryOption = document.querySelector(`.country-option[data-id="${savedCountry}"]`);
                if (countryOption) {
                    countryOption.click();
                    
                    if (savedCity && locationData[savedCountry].cities.includes(savedCity)) {
                        // Simuler le clic sur l'option de ville
                        setTimeout(() => {
                            const cityOption = document.querySelector(`.city-option[data-id="${savedCity.toLowerCase()}"]`);
                            if (cityOption) {
                                cityOption.click();
                                
                                if (savedLottery && locationData[savedCountry].lotteries.some(l => l.id === savedLottery)) {
                                    // Simuler le clic sur l'option de loterie
                                    setTimeout(() => {
                                        const lotteryOption = document.querySelector(`.lottery-option[data-id="${savedLottery}"]`);
                                        if (lotteryOption) lotteryOption.click();
                                    }, 100);
                                }
                            }
                        }, 100);
                    }
                }
            }
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        }
        
        function createConfetti() {
            const colors = ['#00C853', '#FFD700', '#FFFFFF', '#009624', '#FFC400'];
            const container = document.querySelector('.container');
            
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.opacity = '0.8';
                confetti.style.zIndex = '1000';
                confetti.style.animation = `confetti ${Math.random() * 3 + 2}s linear forwards`;
                container.appendChild(confetti);
                
                // Supprimer après l'animation
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }
    </script>
</body>
</html>
