@echo off
echo Opening firewall for IELTS app...
netsh advfirewall firewall add rule name="IELTS Speaking" dir=in action=allow protocol=TCP localport=4173
netsh advfirewall firewall add rule name="IELTS Speaking 8080" dir=in action=allow protocol=TCP localport=8080
echo Done! Now open http://10.201.27.139:4173 on your phone.
pause
