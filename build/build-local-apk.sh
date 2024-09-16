VERSION=$(node build/incrementar-versao.js $1)
echo $VERSION
echo "Será gerado o apk fitnessApp.$VERSION.apk"
eas build --platform android --profile production --local --output fitnessApp.$VERSION.apk 
killall java